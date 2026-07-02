# Phase 2 Minimal Test Record

Project: `arcade-projects/phase2-minimal`

## Source Verification

- `pxt.json` exists: passed.
- `main.ts` exists: passed.
- No coins, enemies, life, boss, shooting, second level, or moving platforms were added: passed by source review.
- Code structure uses MakeCode Arcade concepts that map to beginner blocks: player sprite, controller movement, gravity, button event, tile collision check, camera follow, sprite overlap, game over.

## MakeCode Arcade Simulator Test

Status: partially verified in MakeCode Arcade browser editor.

Run date: 2026-07-02.

Observed results:

- A new MakeCode Arcade project named `chip-hero-phase2-minimal` was created in the browser editor.
- `main.ts` was pasted into the JavaScript editor.
- MakeCode showed `0` problems after paste.
- Simulator/editor screenshot saved to `docs/testing/phase2-minimal-makecode-editor.png`.
- Simulator was started and showed the player, ground, and platform/goal area.
- Running simulator screenshot saved to `docs/testing/phase2-minimal-simulator-running.png`.
- Basic simulator input smoke test sent Right, Right, and Space/A-equivalent key input to the canvas.
- Post-input screenshot saved to `docs/testing/phase2-minimal-simulator-input-test.png`.
- Repeated-right-key progress smoke test screenshot saved to `docs/testing/phase2-minimal-simulator-progress-test.png`.
- No visible alert or compile error appeared after the smoke test.
- Audit correction removed the custom helper function `makeSolidTile` to improve beginner blocks readability.
- Corrected source was pasted back into the MakeCode Arcade JavaScript editor.
- Corrected simulator screenshot saved to `docs/testing/phase2-audit-corrected-simulator.png`.
- Corrected simulator showed player, ground, and platform after the rewrite.

Not yet fully verified:

- Full playthrough from start to portal.
- Falling below the map and restarting from game-over flow.
- Reimporting the generated `.txt.mkcd` by drag/drop.
- Exporting a true MakeCode project PNG.

Required simulator checks:

- Project imports into MakeCode Arcade: source pasted into a new browser project; `.txt.mkcd` reimport still pending.
- Player appears near the left side of the map: passed visually in simulator screenshot.
- Left and right movement work: smoke tested by keyboard input; full gameplay feel pending.
- Player falls due to gravity and lands on solid tiles: passed visually in simulator screenshot.
- A button jumps only while touching the ground: smoke tested by keyboard input; exact ground-only behavior pending full manual check.
- Camera follows the player: pending full playthrough.
- Player can reach the portal: pending full playthrough.
- Touching the portal shows the win screen: pending full playthrough.
- Falling below the map shows the failure screen: pending full playthrough.
- After game over, the player can restart from the Arcade game-over flow: pending full playthrough.

## Hardware Test

Status: pending on-site hardware verification.

Hardware fields to fill later:

- Hardware model:
- Operating system:
- Browser:
- USB cable verified for data transfer:
- UF2 export created:
- Device recognized:
- Movement tested:
- Jump tested:
- Goal tested:
- Failure and restart tested:
- Issues found:
- Tester:
- Date:
