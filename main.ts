 

// function for the main menue
function mainMenue() {
    let cursor = sprites.create(assets.image`Cursor`,SpriteKind.Player) // create mouse cursor
    controller.moveSprite(cursor, 150, 150) // move mouse withe arrows
}

mainMenue() // start the  game
