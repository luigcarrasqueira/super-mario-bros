import EnemyWalk from "../traits/EnemyWalk.js";
import Killable from "../traits/Killable.js";
import Stomper from "../traits/Stomper.js";
import Trait from "../Trait.js";

export default class GoombaBehavior extends Trait {
    constructor() {
        super();
    }

    collides(us, them) {
        if (us.traits.get(Killable).dead) return;

        if (them.traits.has(Stomper)) {
            if (them.speed.y > us.speed.y) {
                us.traits.get(Killable).kill();
                us.traits.get(EnemyWalk).speed = 0;
            } else {
                them.traits.get(Killable).kill();
            }
        }
    }
}