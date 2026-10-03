# CES Door Angle Sensor — placement review

The target PCB contains all 13 source components, four standalone programming pads, 64 component pad/net assignments, and 24 net records. Electrical connectivity is copied; copper routing is intentionally pending placement review.

- U1 / AS5600: center (0, 0), rotation 270°, locked.
- CN1: (-300, -640) mil, rotation 270°, faces left below the left mounting hole.
- CN2: (-220, -1060) mil, rotation 0°, faces down along the bottom edge.
- Programming pads: x = -410 mil; V/S/G/R at y = 100/0/-100/-200 mil. Original 60 mil pad diameter and 36 mil drill retained.
- Board identification text was reduced to fit clear of components; U1/CN1/CN2 labels are visible.
- Source PCB is unchanged. Target outline and both original hole representations are unchanged.

## Verification

`placement.png` is captured from the actual LCEDA editor after reloading the saved file, with ratlines hidden for readability. `verification.json` contains editor-read component/pad positions, net data, and DRC results. `summary.json` records the static source-to-target comparisons.

Final DRC: 52 expected unconnected-pad findings (unrouted stage), plus two board-outline-to-slot-region clearance findings. The latter come from the original target's duplicate circular hole outlines and overlapping multi-layer slot fills. These mechanical definitions are preserved and need reconciliation before manufacturing. No other clearance findings were returned. Physical mating-plug and cable envelopes have not been validated in 3D.

The target PCB is a standalone PCB in the project, as it was originally; its copied nets do not establish an automatic schematic-to-PCB synchronization link.

`target-before-placement.txt` is the exact original target PCB backup. Other JSON files retain CLI diagnostics from the implementation and verification process; `verification.json` and `summary.json` describe the final result.
