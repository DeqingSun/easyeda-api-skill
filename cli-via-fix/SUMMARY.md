# Via-in-pad correction

Verified through CLI that N$1 had no pads or traces; its only via was ie289 at (1136,258) mil. Reassigned that via to $1N2908 without changing its position, drill, diameter or solder-mask settings. Removed the newly added via at (1095,235) that overlapped R3 pad 2.

Replaced only three recently added branch segments with four new segments connecting R3 to the reused via and the existing new bottom-layer route. All other trace objects and vias remain exactly unchanged. All components unchanged. The orphan via net reassignment is the sole change to pre-existing copper, explicitly requested by the user.

Ground pour rebuilt. Final DRC returned no errors. Saved successfully via CLI. No CLI failures occurred. Evidence: before.json, changed.json, final.json.
