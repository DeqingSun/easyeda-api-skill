# LCEDA Pro CLI schematic-to-PCB import reports success without applying additions

## Environment
- macOS; JLCEDA Pro 4.1.60.198f38ab.
- Executable: `/Applications/嘉立创EDA(专业版).app/Contents/MacOS/LCEDA-Pro`
- Project: `ProDoc_simpleCH552_typeA_start/ProDoc_simpleCH552_typeA_start.eprj3`
- Schematic UUID: `99f6142728eb4f87982c57f76e2fa058`
- Sheet UUID: `5ff57169d7aa4cda9b7ea0cc7ea9e9c5`
- PCB UUID: `b94fac5e9b834a7aaae36a3a69acdf31`
- `doctor`: connected, matching bridge version, working result channel.

## Expected
Import the saved schematic's five new components (R1/R2/R3 10K Res_0805, LED2 LED_0805-G, SW1 C381038) and corresponding nets into its associated PCB. Component count should increase from 8 to 13.

## Reproduction
1. Open the project using `LCEDA-Pro open --path <absolute eprj3 path>`.
2. Use `invoke --session <session> --ext-uuid eda --code '<code>'` for each following snippet.
3. Open PCB: `return await eda.dmt_EditorControl.openDocument("b94fac5e9b834a7aaae36a3a69acdf31");`
4. Read PCB components: `return await eda.pcb_PrimitiveComponent.getAll();` (8 components).
5. Import: `return await eda.pcb_Document.importChanges("99f6142728eb4f87982c57f76e2fa058");`
6. Response: `{"ok":true,"value":true,"logs":[],"durationMs":2139}`.
7. After settling and subsequent calls, PCB still contains only J2, U2, USB1, C1, C2, LED1, F1, J1.
8. Open source schematic sheet through `openDocument`, read components, and export netlist with `sch_ManufactureData.getNetlistFile`. All five additions are present in the saved source. Return to PCB.
9. Retry `return await eda.pcb_Document.importChanges();` using default board association.
10. Response again `ok:true,value:true` (268 ms), but subsequent component and PCB netlist reads still show only eight parts.

## Observed result and impact
Before manual confirmation, sync did not complete via the documented import API alone. Both forms report success without reflected additions. Original component snapshots, 229 line objects, 24 vias, and 4 polylines compare exactly equal before and after. No PCB save was invoked after these no-op attempts.

User observation after the test: a confirmation window pops up and requires a click to apply the import. This identifies the interactive confirmation as the blocker for the CLI-only workflow. The agent did not inspect or click the GUI. The returned `true` does not establish that the import has been applied.

Requested fix: provide a documented noninteractive confirmation/apply option or API, and return a structured `confirmationRequired`/pending status when user interaction is still required. Report completed success only after applying the changes. Document the confirmation behavior and any CLI method for accepting it.

## Additional project-open anomaly
The initial `open --path` returned success, but `getCurrentProjectInfo()` returned null, `getAllProjectsUuid()` returned [], and `openDocument(PCB_UUID)` returned null. Closing only that newly created session and opening a fresh one recovered current project access. In the recovered session `getAllProjectsUuid()` still returned [] despite valid current project data; this list may have different semantics for folder projects. Cause undetermined.

## Evidence
- `doctor.json`, `open.json`, `project.json`, `runtime.json`: initial session anomaly.
- `reopen.json`, `retry-project.json`, `retry-open-pcb.json`: recovery.
- `import-doc.json`: documented import signature.
- `source.json`: persisted schematic components and netlist.
- `before.json`, `after.json`, `final.json`: PCB snapshots and netlists.
- `import.json`, `import-default.json`: both successful import responses.
- `settled.json`: unchanged component list after settling.

All design access used the CLI. Local Python only compared returned JSON evidence.

## Confirmed resolution after manual click

The user requested another import attempt. Session `ddcf90c6-0116-49e4-bbc0-d80104291e5f` was opened, the PCB activated, and `pcb_Document.importChanges()` returned `ok:true,value:true` after 1685 ms. This time the session was left open and the user clicked the confirmation window.

After that click, CLI verification found **13 PCB components**, including all five additions. Every pin-to-net assignment matches the saved schematic. All eight original component objects, 229 line objects, 24 vias and four polylines remain exactly unchanged. `pcb_Document.save()` returned true.

This before/after evidence establishes that manual confirmation completes the import, while the CLI success result alone does not mean the changes have been applied. No cursor automation or GUI data inspection was used.

Additional evidence: `manual-confirm-open.json`, `manual-confirm-project.json`, `manual-confirm-import.json`, `confirmed.json`, `verification.json`, `save.json`.

Correction concerning window disappearance: the earlier session was explicitly closed by the agent after diagnosing the failed unattended sync. The disappearing window must not be reported as a confirmed timeout bug.

Suggested API contract: expose an explicit noninteractive apply option or confirmation token/API; report `pending_confirmation` until accepted, and return applied/cancelled status plus change counts when complete. Existing interactive behavior can remain the default, but should be documented.
