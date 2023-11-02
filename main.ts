
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
let basicenemys: Sprite[] = []

/* -- "Execution" -- */



/* -Functions- */



/* Menue Functions */

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
        } else if (cursor.overlapsWith(tutroialBtn)) {
            destroyAll()
            tutorial()
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
    
    scene.setTileMapLevel(assets.tilemap`Tutorial`)

    platformerSetup()

    BscEnSetup(1, false, 2000) 

    reLocate(basicenemys[1], 25, 13)
    reLocate(player, 2, 13)

    let hitOne = false
    let hitTwo = false
    
    pause(100)
    game.showLongText('Use the right and left arrow keys to move, up to jump.', DialogLayout.Bottom)
    console.log('yes')
    scene.onOverlapTile(SpriteKind.Player, assets.tile`hitBox1`, function(sprite: Sprite, location: tiles.Location) {
        console.log('Stuff')
    })

}



/* Engine Functions */


// function for destroying all sprites on the screen
function destroyAll() {
    sprites.destroyAllSpritesOfKind(SpriteKind.Button)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
}

// function for basic platformer setup
function platformerSetup() {
    
    // player set up
    player = sprites.create(assets.image`Player`, SpriteKind.Player)
    controller.moveSprite(player, 100, 0) // move left/rght
    scene.cameraFollowSprite(player)      // camra follow player
    player.ay = 500                       // make player fall
    info.setLife(3)                       // give the player three lives

    // jump set up
    controller.up.onEvent(ControllerButtonEvent.Pressed, function () { // up button pressed
        if (player.isHittingTile(CollisionDirection.Bottom)) {         // if the sprite is on the floor
            player.vy = -200 // jump
        }
    })

    // colisions
    let hitCoolDwn = false
    let attackCoolDwn = false
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite: Sprite, otherSprite: Sprite) {       // when the playeer overlaps with the basic enemy
        if (sprite.vy >0 && (!(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y > otherSprite.top) && (attackCoolDwn == false)) { // if the player landed on the enemy
            player.vy = -100
            otherSprite.destroy() // destroy the enemy
        } else if (hitCoolDwn == false){
            info.changeLifeBy(-1)
            controller.moveSprite(player, 0 ,0)
            player.vy = -100
            player.vx = -50
            hitCoolDwn = true
            attackCoolDwn = true

            timer.after(500, function () {
                player.vx = 0
                controller.moveSprite(player, 100, 0)
                attackCoolDwn = false
                pause(1000)
                hitCoolDwn = false
            })
        }
    })
    let lastLocaton:any = player.tilemapLocation
    scene.onOverlapTile(SpriteKind.Player, assets.tile`Lava1` || assets.tile`Lava2`, function () {
        tiles.placeOnTile(player, tiles.getTileLocation(lastLocaton.y, lastLocaton.x))
        /*while (!(tiles.tileAtLocationIsWall(player.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom)))) {
            player.yLocation =- 1
        }*/
    })
    scene.onOverlapTile(SpriteKind.Player, assets.tile`Respawn Point`, function () {
        lastLocaton = player.tilemapLocation
    })
}

// function for basic enemy setup
function BscEnSetup(numOEn: number, fullAreia: boolean, lenght: number) {
    //enemy setup
    for (let i = 0; i <= numOEn; i++) {
        basicenemys[i] = sprites.create(assets.image`Basic Enemy`, SpriteKind.Enemy)
        basicenemys[i].vx = -30
    }

    // enemy movment setup
    if (fullAreia == true) {
        game.onUpdateInterval(200, function () { // evry 0.2 sec          
            for (let i = 0; i <= numOEn; i++) {
                if (basicenemys[i].vx == 30) {  // if the player is traveling right
                    if (!(tiles.tileAtLocationIsWall(basicenemys[i].tilemapLocation().getNeighboringLocation(CollisionDirection.Right).getNeighboringLocation(CollisionDirection.Bottom)))) { // if the tile to the below and to the right of the sprite is not a wall
                        basicenemys[i].vx = -30 // make the sprite turn the other direction
                    }
                } else {
                    if (!(tiles.tileAtLocationIsWall(basicenemys[i].tilemapLocation().getNeighboringLocation(CollisionDirection.Left).getNeighboringLocation(CollisionDirection.Bottom)))) { // if the tile to the below and to the right of the sprite is not a wall
                        basicenemys[i].vx = 30 // make the sprite turn the other direction
                    }
                }
            }
        })
    } else {
        game.onUpdateInterval(lenght, function () {
            for (let i = 0; i <= numOEn; i++) {
                if (basicenemys[i].vx == -30) {
                    basicenemys[i].vx = 30
                } else {
                    basicenemys[i].vx = -30
                }
            }
        })
    }
}

function reLocate(srit: any, x: number, y: number) {
    tiles.placeOnTile(srit, tiles.getTileLocation(x, y))
}




/* Level Functions*/


function lvl1() {

    // scene stup
    scene.setTileMapLevel(assets.tilemap`level1`) // load tilemap

    // game setup
    platformerSetup() // setup player

    reLocate(player, 1, 14) // relocate the player

    // enemy setup
    BscEnSetup(3, true, 0) // spawn basic enemys

    // relocate enemys
    reLocate(basicenemys[1], 10, 14)
    reLocate(basicenemys[2], 20, 14)
    reLocate(basicenemys[3], 29, 11)
        
}


/* -Begin Game- */

// intro image
scene.setBackgroundImage(assets.image`Intro Image`) // load the intro image
pause(1000);                                        // wait a few second so the player can see the image
scene.setBackgroundImage(null)                      // get rid of the image

// stat game
mainMenue() // load the menue

