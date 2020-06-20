import Trait from "../Trait.js";
import {Sides} from "../libs/sides.js";

export default class Jump extends Trait {
    constructor() {
        super();
        
        this.ready = 0;
        this.duration = .3;
        this.speed = 200;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = .1;
        this.speedBoost = .3;
    }

    start() {
        this.requestTime = this.gracePeriod;
    }

    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }
 
    obstruct(entity, side) {
        if (side === Sides.BOTTOM) this.ready = 1;
        else if (side === Sides.TOP) this.cancel();
    }

    update(entity, gameContext) {
        const {time} = gameContext;

        if (this.requestTime > 0) {
            if (this.ready > 0) {
                entity.sounds.add("jump_small");
                this.engageTime = this.duration;
                this.requestTime = 0;
            }

            this. requestTime -= time;
        }

        if (this.engageTime > 0) {
            entity.speed.y = -(this.speed + Math.abs(entity.speed.x)*this.speedBoost);
            this.engageTime -= time;
        }

        this.ready--;
    }

    get falling() {
        return this.ready < 0;
    }
}