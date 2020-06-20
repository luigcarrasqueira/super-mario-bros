import Trait from "../Trait.js";

export default class Killable extends Trait {
    constructor() {
        super();

        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 2;
    }

    kill() {
        this.queue(() => this.dead = true);
    }

    revive() {
        this.dead = false;
        this.deadTime = 0;
    }

    update(entity, gameContext, world) {
        if (this.dead) {
            this.deadTime += gameContext.time;

            if (this.deadTime > this.removeAfter) {
                this.queue(function() {
                    world.entities.delete(entity);
                });
            }
        }
    }
}