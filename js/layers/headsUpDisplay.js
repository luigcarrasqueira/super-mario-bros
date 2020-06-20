import WorldTimer from "../traits/WorldTimer.js";
import Player from "../traits/Player.js";
import {findPlayers} from "../libs/player.js";

function getPlayerTrait(entities) {
    for (const entity of findPlayers(entities)) return entity.traits.get(Player);
}

function getTimerTrait(entities) {
    for (const entity of entities) {
        if (entity.traits.has(WorldTimer)) return entity.traits.get(WorldTimer);
    }
}

export function createHeadsUpDisplayLayer(font, world) {
    const LINE1 = font.size;
    const LINE2 = font.size*2;
    const playerTrait = getPlayerTrait(world.entities);
    const time = getTimerTrait(world.entities);

    return function(context) {
        font.print(playerTrait.name, context, 24, LINE1);
        font.print(playerTrait.score.toString().padStart(6, "0"), context, 24, LINE2);
        font.print("@*" + playerTrait.coins.toString().padStart(2, "0"), context, 88, LINE2);
        font.print("WORLD", context, 144, LINE1);
        font.print(world.name, context, 152, LINE2);
        font.print("TIME", context, 200, LINE1);
        font.print(time.currentTime.toFixed().toString().padStart(3, "0"), context, 208, LINE2);
    }
}