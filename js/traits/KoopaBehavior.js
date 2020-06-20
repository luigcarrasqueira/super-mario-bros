import EnemyWalk from "../traits/EnemyWalk.js";
import Killable from "../traits/Killable.js";
import Stomper from "../traits/Stomper.js";
import Solid from "../traits/Solid.js";
import Trait from "../Trait.js";

export default class KoopaBehavior extends Trait {
    constructor() {
        super();

        this.hideTime = 0;
        this.hideDuration = 5;
        this.walkSpeed = null;
        this.shellSpeed = 150;
        this.state = KoopaBehavior.STATE_WALKING;
    }

    static STATE_WALKING = Symbol("walking");
    static STATE_HIDING = Symbol("hiding");
    static STATE_SLIDING = Symbol("sliding");

    collides(us, them) {
        if (us.traits.get(Killable).dead) return;

        if (them.traits.has(Stomper)) {
            if (them.speed.y > us.speed.y) this.handleStomp(us, them);
            else this.handleNudge(us, them);
        }
    }

    handleStomp(us, them) {
        if (this.state === KoopaBehavior.STATE_WALKING) this.hide(us);
        else if (this.state === KoopaBehavior.STATE_HIDING) {
            us.traits.get(Killable).kill();
            us.speed.set(100, -200);
            us.traits.get(Solid).enabled = false;
        } else if (this.state === KoopaBehavior.STATE_SLIDING) this.hide(us);
    }

    handleNudge(us, them) {
        if (this.state === KoopaBehavior.STATE_WALKING) them.traits.get(Killable).kill();
        else if (this.state === KoopaBehavior.STATE_HIDING) this.slide(us, them);
        else if (this.state === KoopaBehavior.STATE_SLIDING) {
            const travelDirection = Math.sign(us.speed.x);
            const impactDirection = Math.sign(us.position.x - them.position.x);

            if (travelDirection !== 0 && travelDirection !== impactDirection) them.traits.get(Killable).kill();
        }
    }

    hide(us) {
        us.speed.x = 0;
        us.traits.get(EnemyWalk).enabled = false;

        if (this.walkSpeed === null) this.walkSpeed = us.traits.get(EnemyWalk).speed;

        this.hideTime = 0;
        this.state = KoopaBehavior.STATE_HIDING;
    }

    unhide(us) {
        us.traits.get(EnemyWalk).enabled = true;
        us.traits.get(EnemyWalk).speed = this.walkSpeed;
        this.state = KoopaBehavior.STATE_WALKING;
    }

    slide(us, them) {
        us.traits.get(EnemyWalk).enabled = true;
        us.traits.get(EnemyWalk).speed = this.shellSpeed*Math.sign(them.speed.x);
        this.state = KoopaBehavior.STATE_SLIDING;
    }

    update(us, gameContext) {
        if (this.state === KoopaBehavior.STATE_HIDING) {
            this.hideTime += gameContext.time;

            if (this.hideTime > this.hideDuration) this.unhide(us);
        }
    }
}