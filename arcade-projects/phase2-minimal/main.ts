namespace SpriteKind {
    export const Goal = SpriteKind.create()
}

let player: Sprite = null
let goalPortal: Sprite = null
let blankTile: Image = null
let groundTile: Image = null
let platformTile: Image = null

scene.setBackgroundColor(9)
game.setGameOverMessage(true, "CLEAR!")
game.setGameOverMessage(false, "TRY AGAIN")

blankTile = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`
groundTile = img`
    8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8
    8 7 7 7 7 7 8 8 7 7 7 7 7 8 8 8
    7 7 9 9 7 7 7 7 7 9 9 7 7 7 7 8
    7 9 9 9 9 7 7 7 9 9 9 9 7 7 7 7
    5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
    5 4 4 5 5 4 4 5 5 4 4 5 5 4 4 5
    4 4 5 5 4 4 5 5 4 4 5 5 4 4 5 5
    4 5 5 4 4 5 5 4 4 5 5 4 4 5 5 4
    5 5 4 4 5 5 4 4 5 5 4 4 5 5 4 4
    4 4 5 5 4 4 5 5 4 4 5 5 4 4 5 5
    5 4 4 5 5 4 4 5 5 4 4 5 5 4 4 5
    4 5 5 4 4 5 5 4 4 5 5 4 4 5 5 4
    5 5 4 4 5 5 4 4 5 5 4 4 5 5 4 4
    4 4 5 5 4 4 5 5 4 4 5 5 4 4 5 5
    5 4 4 5 5 4 4 5 5 4 4 5 5 4 4 5
    4 5 5 4 4 5 5 4 4 5 5 4 4 5 5 4
`
platformTile = img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    d d d d d d d d d d d d d d d d
    d b b b b b b b b b b b b b b d
    b b d d b b d d b b d d b b d d
    b d d b b d d b b d d b b d d b
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`

tiles.setTilemap(tiles.createTilemap(hex`1400080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000202020000000000000000000002020202000000000000000000000000000000000000000000000000000000000200000101010101010101010101010101010101010101`, img`
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
`, [blankTile, groundTile, platformTile], TileScale.Sixteen))

for (let column = 0; column <= 19; column++) {
    tiles.setWallAt(tiles.getTileLocation(column, 7), true)
}
for (let column = 5; column <= 8; column++) {
    tiles.setWallAt(tiles.getTileLocation(column, 5), true)
}
for (let column = 12; column <= 14; column++) {
    tiles.setWallAt(tiles.getTileLocation(column, 4), true)
}
tiles.setWallAt(tiles.getTileLocation(17, 6), true)

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
controller.moveSprite(player, 90, 0)
player.ay = 500
tiles.placeOnTile(player, tiles.getTileLocation(1, 6))
scene.cameraFollowSprite(player)

goalPortal = sprites.create(img`
    . . . . . . a a a a . . . . . .
    . . . . a a 9 9 9 9 a a . . . .
    . . . a 9 9 8 8 8 8 9 9 a . . .
    . . a 9 8 8 7 7 7 7 8 8 9 a . .
    . a 9 8 7 7 f f f f 7 7 8 9 a .
    . a 9 8 7 f f 9 9 f f 7 8 9 a .
    a 9 8 7 f f 9 1 1 9 f f 7 8 9 a
    a 9 8 7 f 9 1 1 1 1 9 f 7 8 9 a
    a 9 8 7 f 9 1 1 1 1 9 f 7 8 9 a
    a 9 8 7 f f 9 1 1 9 f f 7 8 9 a
    . a 9 8 7 f f 9 9 f f 7 8 9 a .
    . a 9 8 7 7 f f f f 7 7 8 9 a .
    . . a 9 8 8 7 7 7 7 8 8 9 a . .
    . . . a 9 9 8 8 8 8 9 9 a . . .
    . . . . a a 9 9 9 9 a a . . . .
    . . . . . . a a a a . . . . . .
`, SpriteKind.Goal)
tiles.placeOnTile(goalPortal, tiles.getTileLocation(18, 6))

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player.isHittingTile(CollisionDirection.Bottom)) {
        player.vy = -180
    }
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Goal, function (sprite, otherSprite) {
    game.over(true, effects.confetti)
})

game.onUpdate(function () {
    if (player.y > 140) {
        game.over(false, effects.dissolve)
    }
})
