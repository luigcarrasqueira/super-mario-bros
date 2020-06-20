import Trait from "../Trait.js";
import {Sides} from "../libs/sides.js";

export default class Solid extends Trait {
    constructor() {
        super();
        
        this.enabled = true;
    }

    obstruct(entity, side, match) {
        if (!this.enabled) return;

        if (side === Sides.RIGHT) {
            entity.bounds.right = match.x1;
            entity.speed.x = 0;
        } else if (side === Sides.BOTTOM) {
            entity.bounds.bottom = match.y1;
            entity.speed.y = 0;
        } else if (side === Sides.LEFT) {
            entity.bounds.left = match.x2;
            entity.speed.x = 0;
        } else if (side === Sides.TOP) {
            entity.bounds.top = match.y2;
            entity.speed.y = 0;
        } 
    }
}