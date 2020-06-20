import Scene from "./Scene.js";

export default class TimedScene extends Scene {
    constructor() {
        super();

        this.countdown = 2.5;
    }

    update({time}) {
        this.countdown -= time;

        if (this.countdown <= 0) this.events.emit(Scene.EVENT_COMPLETE);
    }
}