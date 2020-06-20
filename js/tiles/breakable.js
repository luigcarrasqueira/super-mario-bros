import Player from "../traits/Player.js";
import {Sides} from "../libs/sides.js";

function handleX({entity, match}) {
    if (entity.speed.x > 0) {
        if (entity.bounds.right > match.x1) entity.obstruct(Sides.RIGHT, match);
    } else if (entity.speed.x < 0) {
        if (entity.bounds.left < match.x2) entity.obstruct(Sides.LEFT, match);
    }
}

function handleY({entity, match, resolver, gameContext, world}) {
    if (entity.speed.y > 0) {
        if (entity.bounds.bottom > match.y1) entity.obstruct(Sides.BOTTOM, match);
    } else if (entity.speed.y < 0) {
        if (entity.traits.has(Player)) {
            const grid = resolver.matrix;
            grid.delete(match.indexX, match.indexY);

            const goomba = gameContext.entityFactory.goomba();
            goomba.speed.set(50, -400);
            goomba.position.set(entity.position.x, match.y1);
            world.entities.add(goomba);
        }

        if (entity.bounds.top < match.y2) entity.obstruct(Sides.TOP, match);
    }
}

export const breakable = [handleX, handleY];