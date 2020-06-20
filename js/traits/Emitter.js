import Trait from "../Trait.js";

export default class Emitter extends Trait {
    constructor() {
        super();

        this.interval = 2;
        this.coolDown = this.interval;
        this.emitters = [];
    }

    emit(entity, gameContext, world) {
        for (const emitter of this.emitters) {
            emitter(entity, gameContext, world);
        }
    }

    update(entity, gameContext, world) {
        const {time} = gameContext;

        this.coolDown -= time;

        if (this.coolDown <= 0) {
            this.emit(entity, gameContext, world);
            this.coolDown = this.interval;
        }
    }
}