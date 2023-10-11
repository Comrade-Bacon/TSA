
// setup new sprite kinds:
namespace SpriteKind {
    export const Button = SpriteKind.create() // set up button sprite kind
}

let playBtn:any
let playBtnLabel:any
let tutroialBtn:any
let tutroialBtnLabel:any
let player:any

function destroyAll() {
    sprites.destroyAllSpritesOfKind(SpriteKind.Button)
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
}


// function for the main menue
function mainMenue() {
    
    // crate menue buttons
    createIcon(playBtn, assets.image`playBtn`, playBtnLabel, 'Play', 135, 20)                 // create play button
    createIcon(tutroialBtn, assets.image`tutroialBtn`, tutroialBtnLabel, 'Tutorial', 90 ,20) // create tutorial button
    
    // create Cursor
    let cursor = sprites.create(assets.image`Cursor`, SpriteKind.Player) // create mouse cursor
    controller.moveSprite(cursor, 150, 150)                              // move mouse withe arrows
    cursor.setStayInScreen(true)                                         // prevent the cursor from exiting the screen

    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        if (cursor.overlapsWith(playBtn)) {
            destroyAll()
            lvl1()
        } else {}
    })

        


    function createIcon(btnName:any, icon:any, label:any, text:string, xLocation:number, yLocation:number){
        // create sprite
        btnName = sprites.create(icon, SpriteKind.Button)
        btnName.setPosition(xLocation, yLocation)

        // create label
        playBtnLabel = textsprite.create(text)
        playBtnLabel.setPosition(xLocation, yLocation + 15)
    }
}

function tutorial() {

}

function lvl1() {
    player = sprites.create(assets.image`Player`)
}

scene.setBackgroundImage(assets.image`Intro Image`)
/*music.play(music.createSong(assets.song`background song`), music.PlaybackMode.LoopingInBackground)
music.setVolume(1)*/
pause(1000);
scene.setBackgroundImage(null)

mainMenue() // start the  game
