import Killable from "../traits/Killable.js";
import Trait from "../Trait.js";

export default class Stomper extends Trait {
    constructor() {
        super();

        this.bounceSpeed = 400;
    }

    static EVENT_STOMP = Symbol("stomp");

    onStomp() {

    }

    bounce(us, them) {
        us.bounds.bottom = them.bounds.top;
        us.speed.y = -this.bounceSpeed;
    }

    collides(us, them) {
        if (!them.traits.has(Killable) || them.traits.get(Killable).dead) return;
        if (us.speed.y > them.speed.y) {
            this.queue(() => this.bounce(us, them));
            us.sounds.add("stomp");
            us.events.emit(Stomper.EVENT_STOMP, us, them);
        }
    }
}