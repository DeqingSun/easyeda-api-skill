# Small PCB spacing adjustments

Applied through CLI and saved:
- R1: (1040,410) → (1040,420) mil, opening the gap above LED1 by 10 mil.
- R2: (1030,70) → (1040,55) mil, aligning with LED2 and increasing their vertical center separation from 70 to 85 mil.
- R3: (1030,250) → (1040,245) mil, slightly right and down to balance neighboring gaps and via clearance.
- LED2 and SW1 retain their positions. All rotations preserved.

These are local spacing improvements within the fixed board, not a global maximum-clearance optimization. The button has limited room to the board edge, so it was left in place. An initial R3 downward-only trial caused a clearance error; the final right/down nudge resolved it.

Exact CLI snapshots verify all original component objects, 229 line objects, 24 vias and four outline polylines unchanged. Final DRC contains only 13 unrouted connection errors, with no clearance errors. No routing added. Save succeeded; editor left open. No CLI failures occurred.
