import Trait from "../Trait.js";

export default class Trigger extends Trait {
    constructor() {
        super();

        this.touches = new Set();
        this.conditions = [];
    }

    collides(us, them) {
        this.touches.add(them);
    }

    update(entity, gameContext, world) {
        if (this.touches.size > 0) {
            for (const condition of this.conditions) {
                condition(entity, this.touches, gameContext, world);
            }

            this.touches.clear();
        }
    }
}