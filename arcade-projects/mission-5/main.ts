namespace SpriteKind {
    export const Crystal = SpriteKind.create()
}

let player: Sprite = null
let crystal1: Sprite = null
let crystal2: Sprite = null
let crystal3: Sprite = null
let crystal4: Sprite = null
let crystal5: Sprite = null
let blankTile: Image = null
let groundTile: Image = null
let platformTile: Image = null
let crystalImage: Image = null

scene.setBackgroundColor(9)
info.setScore(0)

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
crystalImage = img`
    . . . . . 9 9 . . . . . . . . .
    . . . . 9 8 8 9 . . . . . . . .
    . . . 9 8 7 7 8 9 . . . . . . .
    . . 9 8 7 1 1 7 8 9 . . . . . .
    . 9 8 7 1 1 1 1 7 8 9 . . . . .
    . 9 8 7 1 f f 1 7 8 9 . . . . .
    . . 9 8 7 1 1 7 8 9 . . . . . .
    . . . 9 8 7 7 8 9 . . . . . . .
    . . . . 9 8 8 9 . . . . . . . .
    . . . . . 9 9 . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`

tiles.setTilemap(tiles.createTilemap(hex`1400080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000202020200000000000000000000000000000000000000000000000000000000000101010101010101010101010101010101010101`, img`
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . . . . . .
`, [blankTile, groundTile, platformTile], TileScale.Sixteen))

tiles.setWallAt(tiles.getTileLocation(0, 7), true)
tiles.setWallAt(tiles.getTileLocation(1, 7), true)
tiles.setWallAt(tiles.getTileLocation(2, 7), true)
tiles.setWallAt(tiles.getTileLocation(3, 7), true)
tiles.setWallAt(tiles.getTileLocation(4, 7), true)
tiles.setWallAt(tiles.getTileLocation(5, 7), true)
tiles.setWallAt(tiles.getTileLocation(6, 7), true)
tiles.setWallAt(tiles.getTileLocation(7, 7), true)
tiles.setWallAt(tiles.getTileLocation(8, 7), true)
tiles.setWallAt(tiles.getTileLocation(9, 7), true)
tiles.setWallAt(tiles.getTileLocation(10, 7), true)
tiles.setWallAt(tiles.getTileLocation(11, 7), true)
tiles.setWallAt(tiles.getTileLocation(12, 7), true)
tiles.setWallAt(tiles.getTileLocation(13, 7), true)
tiles.setWallAt(tiles.getTileLocation(14, 7), true)
tiles.setWallAt(tiles.getTileLocation(15, 7), true)
tiles.setWallAt(tiles.getTileLocation(16, 7), true)
tiles.setWallAt(tiles.getTileLocation(17, 7), true)
tiles.setWallAt(tiles.getTileLocation(18, 7), true)
tiles.setWallAt(tiles.getTileLocation(19, 7), true)
tiles.setWallAt(tiles.getTileLocation(7, 5), true)
tiles.setWallAt(tiles.getTileLocation(8, 5), true)
tiles.setWallAt(tiles.getTileLocation(9, 5), true)
tiles.setWallAt(tiles.getTileLocation(10, 5), true)

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
player.setStayInScreen(true)
player.ay = 350
tiles.placeOnTile(player, tiles.getTileLocation(2, 6))

crystal1 = sprites.create(crystalImage, SpriteKind.Crystal)
tiles.placeOnTile(crystal1, tiles.getTileLocation(4, 6))
crystal2 = sprites.create(crystalImage, SpriteKind.Crystal)
tiles.placeOnTile(crystal2, tiles.getTileLocation(6, 6))
crystal3 = sprites.create(crystalImage, SpriteKind.Crystal)
tiles.placeOnTile(crystal3, tiles.getTileLocation(5, 5))
crystal4 = sprites.create(crystalImage, SpriteKind.Crystal)
tiles.placeOnTile(crystal4, tiles.getTileLocation(8, 4))
crystal5 = sprites.create(crystalImage, SpriteKind.Crystal)
tiles.placeOnTile(crystal5, tiles.getTileLocation(9, 4))

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (player.isHittingTile(CollisionDirection.Bottom)) {
        player.vy = -150
    }
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Crystal, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    otherSprite.destroy()
})
