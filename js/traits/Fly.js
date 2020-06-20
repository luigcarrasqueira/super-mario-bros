import Trait from "../Trait.js";

export default class Fly extends Trait {
    constructor() {
        super();
    }

    update(entity, gameContext) {
        const {time} = gameContext;

        entity.position.x += entity.speed.x*time;
        entity.position.y += entity.speed.y*time;
    }
}