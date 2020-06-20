import PlayerController from "../traits/PlayerController.js";
import Player from "../traits/Player.js";
import Entity from "../Entity.js";

export function createPlayerEnvironment(playerEntity){
    const playerEnvironment = new Entity();
    const playerControl = new PlayerController();

    playerControl.checkpoint.set(40, 192);
    playerControl.setPlayer(playerEntity);
    playerEnvironment.addTrait(playerControl);

    return playerEnvironment;
}

export function createPlayer(entity, name) {
    const player = new Player();
    player.name = name;

    entity.addTrait(player);
}

export function* findPlayers(entities) {
    for (const entity of entities) {
        if (entity.traits.has(Player)) yield entity;
    }
}