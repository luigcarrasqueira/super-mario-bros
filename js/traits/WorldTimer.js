import Trait from "../Trait.js";

export default class WorldTimer extends Trait {
    constructor() {
        super();

        this.totalTime = 400;
        this.currentTime = this.totalTime;
        this.hurryTime = 100;
        this.hurryEmitted = null;
    }

    static EVENT_TIMER_HURRY = Symbol("timer hurry");
    static EVENT_TIMER_OK = Symbol("timer ok");

    update(entity, gameContext, world) {
        this.currentTime -= gameContext.time*2.5;

        if (this.hurryEmitted !== true && this.currentTime < this.hurryTime) {
            world.events.emit(WorldTimer.EVENT_TIMER_HURRY);
            this.hurryEmitted = true;
        }

        if (this.hurryEmitted !== false && this.currentTime > this.hurryTime) {
            world.events.emit(WorldTimer.EVENT_TIMER_OK);
            this.hurryEmitted = false;
        }
    }
}