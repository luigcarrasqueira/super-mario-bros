import Trait from "../Trait.js";

export default class Physics extends Trait {
    constructor() {
        super();
    }

    update(entity, gameContext, world) {
        const {time} = gameContext;

        entity.position.x += entity.speed.x*time;
        world.tileCollider.checkX(entity, gameContext, world);
        
        entity.position.y += entity.speed.y*time;
        world.tileCollider.checkY(entity, gameContext, world);

        entity.speed.y += world.gravity*time;
    }
}