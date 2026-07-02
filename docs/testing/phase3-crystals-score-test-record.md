# Phase 3 Crystals And Score Test Record

Project: `arcade-projects/phase3-crystals-score`

## Scope

This phase adds only:

- Crystal SpriteKind.
- Four fixed energy crystals.
- Score reset at game start.
- Player and crystal overlap event.
- Score +1 on collection.
- Destroy collected crystal.
- Short collection sound.

This phase does not add enemies, life, invincibility, boss, second level, shooting, chest, random generation, particle animation, or extensions.

## Source Verification

- `pxt.json` exists: passed.
- `main.ts` exists: passed.
- MakeCode Arcade APIs used: `sprites`, `controller`, `tiles`, `scene`, `game`, `info`, `music`.
- Blocks readability target: beginner-friendly event and variable structure.
- No enemies, life, invincibility, boss, second level, shooting, chest, random generation, particle animation, or extensions were added.

## MakeCode Arcade Simulator Test

Status: partially simulator-tested.

Run date: 2026-07-02.

Observed results:

- Phase 3 source was pasted into the MakeCode Arcade JavaScript editor.
- MakeCode editor displayed `SpriteKind.Crystal`, score change, and destroy logic after paste.
- No visible alert appeared immediately after paste.
- Simulator fullscreen screenshot saved to `docs/testing/phase3-crystals-simulator-fullscreen-retry.png`.
- Screenshot confirms score starts at `0`.
- Screenshot confirms visible player, ground, platform, and energy crystals.
- Keyboard/virtual-dpad collection test was attempted, but browser automation focus was unreliable and did not produce a confirmed collection result.

Not yet fully verified:

- Collecting a crystal changes score to 1.
- Collected crystal disappears.
- Same crystal cannot score twice.
- Collection sound audibly plays.
- All crystals can be collected.
- Goal still works after collecting crystals.
- Restart resets score and crystals.

Required simulator checks:

- Score starts at 0: passed visually.
- Four crystals are visible: partially passed visually, visible crystals confirmed in starting camera view; offscreen/late-map crystal still needs manual playthrough.
- Player can collect every crystal.
- Each crystal adds exactly 1 point.
- Collected crystal disappears immediately.
- Same crystal cannot score twice.
- Collection sound plays.
- Player movement, jump, tilemap, camera, and goal still work.
- Restart resets score and crystals.

## Hardware Test

Status: hardware boot tested.

Hardware target: N3.

Passed:

- UF2成功產生或下載。
- UF2成功傳入遊戲機。
- 遊戲機成功重新啟動。
- 遊戲可在實體Arcade硬體上執行。
- 畫面可正常顯示。

Pending:

- 左方向鍵移動。
- 右方向鍵移動。
- A鍵跳躍。
- 防止空中無限跳躍。
- 晶片正常顯示。
- 晶片可以取得。
- 晶片取得後消失。
- 分數正確增加。
- 取得音效正常播放。
- 終點過關。
- 遊戲重新開始。
- 分數重新歸零。
- 晶片重新出現。
- 玩家回到正確位置。
- 長時間操作是否穩定。

Note:

已確認可成功傳入實體Arcade遊戲機並正常啟動，完整操作功能仍待逐項驗證。
