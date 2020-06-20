import Trait from "../Trait.js";
import {Sides} from "../libs/sides.js";

export default class EnemyWalk extends Trait {
    constructor() {
        super();

        this.enabled = true;
        this.speed = -30;
    }

    obstruct(koopa, side) {
        if (side === Sides.LEFT || side === Sides.RIGHT) this.speed = -this.speed;
    }

    update(entity, gameContext) {
        if (this.enabled) entity.speed.x = this.speed;
    }
}