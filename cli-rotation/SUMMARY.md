# Rotation trial

Tested R2 at 0, 90, 180 and 270 degrees and R3 at 0, 90, 180 and 270 degrees through CLI, reading actual pad locations after changes. Kept R2 at 180 degrees; restored R3 to 0 degrees. No component centers were moved.

R2's LED-side pad now sits at (990.6,70), near LED2's anode (998.7,139.8). Its P3.3 pad is at (1069.4,70), facing the existing P3.3 via at (1165.014,194.986). Previously these two R2 pads were reversed. Direct connection segments from R2 to those two targets crossed before and do not cross now. This is a routing heuristic, not a guarantee of final routed topology: obstacles, layers and clearances still influence actual routing.

Final comparison: only R2 rotation changed. Every other component object, all 229 line objects, 24 vias and four outline polylines remain exactly unchanged. No routes added. Final DRC: 13 connection errors, no clearance errors. Saved successfully via CLI; editor left open.

Evidence: before.json, candidates.json, r3-candidates.json, final.json, saved.json, final.png. No CLI failures occurred.
