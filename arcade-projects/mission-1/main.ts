let player: Sprite = null

scene.setBackgroundColor(9)
player = sprites.create(img`
    . . . . . 9 9 9 9 9 9 . . . . .
    . . . . 9 8 8 8 8 8 8 9 . . . .
    . . . 9 8 7 7 7 7 7 8 8 9 . . .
    . . . 9 8 7 f 7 7 f 7 8 9 . . .
    . . . 9 8 7 7 7 7 7 7 8 9 . . .
    . . . . 9 8 8 7 7 8 8 9 . . . .
    . . . . . 9 8 8 8 8 9 . . . . .
    . . . . d d 9 9 9 9 d d . . . .
    . . . d d 1 d d d d 1 d d . . .
    . . d d d 1 d d d d 1 d d d . .
    . . . . d d 1 1 1 1 d d . . . .
    . . . . . d 1 1 1 1 d . . . . .
    . . . . . d d . . d d . . . . .
    . . . . d d . . . . d d . . . .
    . . . . d . . . . . . d . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
player.setPosition(40, 88)
