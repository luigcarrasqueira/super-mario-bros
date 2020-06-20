import Trait from "../Trait.js";

export default class Walk extends Trait {
    constructor() {
        super();

        this.direction = 0;
        this.acceleration = 400;
        this.deceleration = 300;
        this.dragFactor = 1/1500;
        this.distance = 0;
        this.heading = 1;
    }

    update(entity, gameContext) {
        const {time} = gameContext;
        const absX = Math.abs(entity.speed.x);

        if (this.direction) {
            entity.speed.x += this.acceleration*time*this.direction;

            if (entity.jump && !entity.jump.falling || !entity.jump) this.heading = this.direction;
        } else if (entity.speed.x) {
            const deceleration = Math.min(absX, this.deceleration*time);

            entity.speed.x += entity.speed.x > 0 ? -deceleration : deceleration;
        } else this.distance = 0;

        const drag = this.dragFactor*entity.speed.x*absX;
        
        entity.speed.x -= drag;
        this.distance += absX*time;
    }
}