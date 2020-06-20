import Trait from "../Trait.js";

export default class Gravity extends Trait {
    constructor() {
        super();
    }

    update(entity, {time}, world) {
        entity.speed.y += world.gravity*time;
    }
}