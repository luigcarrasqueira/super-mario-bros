import EventEmitter from "./EventEmitter.js";
import Compositor from "./Compositor.js";

export default class Scene {
    constructor() {
        this.events = new EventEmitter();
        this.compositor = new Compositor();
    }

    static EVENT_COMPLETE = Symbol("scene complete");

    update({time}) {

    }

    draw({videoContext}) {
        this.compositor.draw(videoContext);
    }

    pause() {
        console.warn("pause");
    }
}