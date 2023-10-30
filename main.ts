
/* -- Setup -- */


// setup new sprite kinds:
namespace SpriteKind {
    export const Button = SpriteKind.create() // set up button sprite kind
}

/*variables*/

// button vars
let playBtn:any
let playBtnLabel:any
let tutroialBtn:any
let tutroialBtnLabel:any

// sprite vars
let player: any
let basicEnemy: any


/* -- "Execution" -- */

/* Functions */


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

    controller.A.onEvent(ControllerButtonEvent.Pressed, function () { // when A is pressed
        if (cursor.overlapsWith(playBtn)) {                           // if the cursor is touching the play button
            destroyAll()                                              // destroy all sprites on the screen
            lvl1()                                                    // start lvl 1
        }
    })

        

    // function for creating buttons
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

// function for basic platformer setup
function platformerSetup() {
    
    // player set up
    player = sprites.create(assets.image`Player`, SpriteKind.Player)
    controller.moveSprite(player, 100, 0)
    scene.cameraFollowSprite(player)

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

    player.ay = 500

    platformerSetup()

    // scene stup
    scene.setTileMapLevel(assets.tilemap`level1`)

    let enemys: any = []
    let enemyNumber:number
    for (let i: number = 0; i < 3; i++) {
        // enemy setup
        enemyNumber = i
        enemys[enemyNumber] = sprites.create(assets.image`Basic Enemy`, SpriteKind.Enemy)
        enemys[enemyNumber].vx = -30
    
        // enemy movment setup
        game.onUpdateInterval(200, function () { // evry 0.2 sec          
            if (enemys[enemyNumber].vx == 30) {  // if the player is traveling right
                if (!(tiles.tileAtLocationIsWall(enemys[enemyNumber].tilemapLocation().getNeighboringLocation(CollisionDirection.Right).getNeighboringLocation(CollisionDirection.Bottom)))) { // if the tile to the below and to the right of the sprite is not a wall
                    enemys[enemyNumber].vx = -30 // make the sprite turn the other direction
                }
            } else {
                if (!(tiles.tileAtLocationIsWall(enemys[enemyNumber].tilemapLocation().getNeighboringLocation(CollisionDirection.Left).getNeighboringLocation(CollisionDirection.Bottom)))) { // if the tile to the below and to the right of the sprite is not a wall
                    enemys[enemyNumber].vx = 30 // make the sprite turn the other direction
                }
            }
        })
    }
    
    tiles.placeOnTile(enemys[1], tiles.getTileLocation(10, 14))
    tiles.placeOnTile(enemys[2], tiles.getTileLocation(20, 14))
    tiles.placeOnTile(enemys[3], tiles.getTileLocation(29, 11))

    // colisions
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite: Sprite, otherSprite: Sprite) {       // when the playeer overlaps with the basic enemy
        if (sprite.vy >0 && (!(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y > otherSprite.top)) { // if the player landed on the enemy
            otherSprite.destroy() // destroy the enemy
        } else {
            sprite.destroy() // destroy the player
        }
    })
        
}


/*Begin Game*/

scene.setBackgroundImage(assets.image`Intro Image`)

pause(1000);
scene.setBackgroundImage(null)

mainMenue() 
