
// setup new sprite kinds:
namespace SpriteKind {
    export const Button = SpriteKind.create() // set up button sprite kind
}

let playBtn:any
let playBtnLabel:any
let tutroialBtn:any
let tutroialBtnLabel:any

let player: any
let basicEnemy: any

function destroyAll() {
    sprites.destroyAllSpritesOfKind(SpriteKind.Button)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
}


// function for the main menue
function mainMenue() {
    
    // crate menue buttons

        // create play button
    playBtn = sprites.create(assets.image`playBtn`, SpriteKind.Button)
    createIcon(playBtn, playBtnLabel, 'Play', 135, 20)

        // create tutorial button
    tutroialBtn = sprites.create(assets.image`tutroialBtn`, SpriteKind.Button)
    createIcon(tutroialBtn, tutroialBtnLabel, 'Tutorial', 90, 20)
    
    // create Cursor
    let cursor = sprites.create(assets.image`Cursor`, SpriteKind.Player) // create mouse cursor
    controller.moveSprite(cursor, 150, 150)                              // move mouse withe arrows
    cursor.setStayInScreen(true)                                         // prevent the cursor from exiting the screen

    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        if (cursor.overlapsWith(playBtn)) {
            destroyAll()
            lvl1()
        }
    })

        


    function createIcon(btnName:any, label:any, text:string, xLocation:number, yLocation:number){
        // create sprite
        btnName.setPosition(xLocation, yLocation)
        // create label
        playBtnLabel = textsprite.create(text)
        playBtnLabel.setPosition(xLocation, yLocation + 15)
    }
}

function setngs() {

}

function tutorial() {

}


function platformerSetup() {
    // jump set up
    controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
        if (player.isHittingTile(CollisionDirection.Bottom)) {
            player.vy = -200
        }
    })
    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        if (player.isHittingTile(CollisionDirection.Bottom)) {
            player.vy = -200
        }
    })
}
function lvl1() {

    // player set up
    player = sprites.create(assets.image`Player`, SpriteKind.Player)
    controller.moveSprite(player, 100, 0)
    player.ay = 500
    scene.cameraFollowSprite(player)
       

    platformerSetup()

    // scene stup
    scene.setTileMapLevel(assets.tilemap`level1`)

    // enemy setup
    basicEnemy = sprites.create(assets.image`Basic Enemy`, SpriteKind.Enemy)
    tiles.placeOnRandomTile(basicEnemy, assets.tile`Basic Enemy Spawner`)

    // colisions
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite: Sprite, otherSprite: Sprite) {  
        if (sprite.vy >0 && (!(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y > otherSprite.top)) {
            otherSprite.destroy()
        } else {
            sprite.destroy()
        }
    })
        
}

scene.setBackgroundImage(assets.image`Intro Image`)
/*music.play(music.createSong(assets.song`background song`), music.PlaybackMode.LoopingInBackground)
music.setVolume(1)*/
pause(1000);
scene.setBackgroundImage(null)

mainMenue()  // start game
