import TileResolver from "./TileResolver.js";
import {breakable} from "./tiles/breakable.js";
import {solid} from "./tiles/solid.js";
import {coin} from "./tiles/coin.js";

const handlers = {
    breakable,
    solid,
    coin
}

export default class TileCollider {
    constructor() {
        this.resolvers = [];
    }

    addGrid(tiles) {
        this.resolvers.push(new TileResolver(tiles))
    }

    checkX(entity, gameContext, world) {
        let x;
        
        if (entity.speed.x > 0) x = entity.bounds.right;
        else if (entity.speed.x < 0) x = entity.bounds.left;
        else return;

        for (const resolver of this.resolvers) {
            const matches = resolver.searchByRange(
                x, x,
                entity.bounds.top, entity.bounds.bottom
            );

            matches.forEach((match) => {
                this.handle(0, entity, match, resolver, gameContext, world);
            });
        }
    }

    checkY(entity, gameContext, world) {
        let y;
        
        if (entity.speed.y > 0) y = entity.bounds.bottom;
        else if (entity.speed.y < 0) y = entity.bounds.top;
        else return;

        for (const resolver of this.resolvers) {
            const matches = resolver.searchByRange(
                entity.bounds.left, entity.bounds.right,
                y, y
            );

            matches.forEach((match) => {    
                this.handle(1, entity, match, resolver, gameContext, world);
            });
        }
    }

    handle(index, entity, match, resolver, gameContext, world) {
        const tileCollisionContext = {
            index,
            entity,
            match,
            resolver,
            gameContext,
            world
        }

        const handler = handlers[match.tile.type];

        if (handler) handler[index](tileCollisionContext);
    }
}