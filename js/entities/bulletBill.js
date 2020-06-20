import BulletBillBehavior from "../traits/BulletBillBehavior.js";
import Killable from "../traits/Killable.js";
import Entity from "../Entity.js";
import {loadSpriteSheet} from "../loaders/loadSpriteSheet.js";
import Fly from "../traits/Fly.js";

function createBulletBillFactory(sprite) {
    function drawBulletBill(context) {
        sprite.draw(
            "bullet",
            context,
            0, 0,
            this.speed.x > 0
        )
    }

    return function() {
        const bulletBill = new Entity();

        bulletBill.size.set(16, 14);
        bulletBill.offset.y = 1;
        bulletBill.addTrait(new BulletBillBehavior());
        bulletBill.addTrait(new Killable());
        bulletBill.addTrait(new Fly());
        bulletBill.draw = drawBulletBill;

        return bulletBill;
    }
}

export function loadBulletBill() {
    return loadSpriteSheet("bulletBill").then(createBulletBillFactory);
}