// Auto-generated code. Do not edit.
namespace myImages {

    helpers._registerFactory("image", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "myTiles.transparency16":return img`
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
`;
            case "myTiles.tile1":
            case "Basic Enemy Spawner":return img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . 2 2 2 2 . . . . 2 2 2 . . . 
. . 2 2 . . . . . . . . 2 . . . 
. . . . 2 2 2 . . . . . 2 . . . 
. . . . . . . 2 2 . . . 2 . . . 
. . . . . . . . . 2 2 2 . . . . 
. . . . . . . . . . . 2 . . . . 
. . . . . 2 2 2 2 2 2 2 . . . . 
. . . . . 2 . . 2 2 . . . . . . 
. . . . . 2 . . 2 2 . . . . . . 
. . . . . 2 2 . . . 2 . . . . . 
. . . . . . . 2 2 2 2 2 2 . . . 
. . . . . . . . . . . . . 2 2 2 
. . . . . . . . . . . . . . . . 
`;
        }
        return null;
    })

    helpers._registerFactory("animation", function(name: string) {
        switch(helpers.stringTrim(name)) {

        }
        return null;
    })

    helpers._registerFactory("song", function(name: string) {
        switch(helpers.stringTrim(name)) {

        }
        return null;
    })

}
// Auto-generated code. Do not edit.

// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level1":
            case "level1":return tiles.createTilemap(hex`1e001000040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000000000000000000000005040000000000000000000000000000000000000600000000000000000005020101010101010101010101010101010101010101010101010101010103`, img`
2............................2
2............................2
2............................2
2............................2
2............................2
2............................2
2............................2
2............................2
2............................2
2............................2
2............................2
2............................2
2............................2
2............................2
2............................2
222222222222222222222222222222
`, [myTiles.transparency16,sprites.builtin.forestTiles6,sprites.builtin.forestTiles17,sprites.builtin.forestTiles19,sprites.builtin.forestTiles9,sprites.builtin.forestTiles11,myTiles.tile1], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return myTiles.transparency16;
            case "Basic Enemy Spawner":
            case "tile1":return myTiles.tile1;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
