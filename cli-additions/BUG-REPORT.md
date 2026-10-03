# LCEDA Pro CLI: legacy schematic netlist API times out

Environment: macOS, JLCEDA Pro 4.1.60.198f38ab.
Executable: /Applications/嘉立创EDA(专业版).app/Contents/MacOS/LCEDA-Pro
Project: ProDoc_simpleCH552_typeA_start, schematic simpleCH552_typeA_start_1.
Bridge doctor: connected=true, versionMatch=true, resultChannel=true.

## Reproduce
Open the project and schematic via CLI. Then run:

```sh
"/Applications/嘉立创EDA(专业版).app/Contents/MacOS/LCEDA-Pro" invoke --session <SESSION> --ext-uuid eda --timeout 5000 --code 'return await eda.sch_Netlist.getNetlist();'
```

Expected: return a netlist string, or a clear deprecation/error response.
Actual: ok:false, REQUEST_TIMEOUT after 4750 ms. CLI says code may still be running in the renderer and its result will be discarded.

Initial combined component/pin/wire/legacy-netlist query also timed out at 59750 ms with the default 60000 ms budget. The isolated legacy-netlist call reproduces the timeout, although the initial compound query does not establish which operation was pending.

## Working workaround
Use `const f = await eda.sch_ManufactureData.getNetlistFile("after"); return await f.text();`.
This supported replacement succeeds. Component reads, wire reads, library search, component creation, wiring, save, PNG export and DRC also succeeded. Work continued entirely through CLI.

The doc API marks SCH_Netlist.getNetlist deprecated. A separate documentation discrepancy: SCH_ManufactureData.getNetlistFile documentation reports return type null, while the actual successful result is a File with .text().

Evidence: before.json, legacy-netlist-repro.json, doctor.json, netlist-doc.json, export-doc.json, netlist-before.json, after.json.
