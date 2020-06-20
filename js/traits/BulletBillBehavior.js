import Killable from "./Killable.js";
import Gravity from "./Gravity.js";
import Stomper from "./Stomper.js";
import Trait from "../Trait.js";

export default class BulletBillBehavior extends Trait {
    constructor() {
        super();

        this.gravity = new Gravity();
    }

    collides(us, them) {
        if (us.traits.get(Killable).dead) return;

        if (them.traits.has(Stomper)) {
            if (them.speed.y > us.speed.y) {
                us.traits.get(Killable).kill();
                us.speed.set(
                    us.speed.x/Math.abs(us.speed.x), 
                    -100
                );
            } else {
                them.traits.get(Killable).kill();
            }
        }
    }

    update(entity, gameContext, world) {
        if (entity.traits.get(Killable).dead) this.gravity.update(entity, gameContext, world);
    }
}