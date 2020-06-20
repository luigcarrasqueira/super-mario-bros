import Player from "../traits/Player.js";
import {findPlayers} from "../libs/player.js";

function getPlayer(entities) {
    for (const entity of findPlayers(entities)) return entity;
}

export function createIntroScreenLayer(font, world) {
    const LINE1 = font.size;
    const LINE2 = font.size*2;
    const player = getPlayer(world.entities);
    const playerTrait = player.traits.get(Player);

    const spriteBuffer = document.createElement("canvas");
    spriteBuffer.width = 32;
    spriteBuffer.height = 32;

    const spriteBufferContext = spriteBuffer.getContext("2d");
    
    return function(context) {
        font.print(playerTrait.name, context, 24, LINE1);
        font.print(playerTrait.score.toString().padStart(6, "0"), context, 24, LINE2);
        font.print("@*" + playerTrait.coins.toString().padStart(2, "0"), context, 88, LINE2);
        font.print("WORLD", context, 144, LINE1);
        font.print(world.name, context, 152, LINE2);
        font.print("TIME", context, 200, LINE1);
        font.print("WORLD  " + world.name, context, font.size*11, font.size*9);
        font.print("*  " + playerTrait.lives, context, font.size*15, font.size*13);

        spriteBufferContext.clearRect(0, 0, spriteBuffer.width, spriteBuffer.height);
        player.draw(spriteBufferContext);
        context.drawImage(spriteBuffer, font.size*12, font.size*12 + 1);

    }
}