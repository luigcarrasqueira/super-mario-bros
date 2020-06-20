import KoopaBehavior from "../traits/KoopaBehavior.js";
import EnemyWalk from "../traits/EnemyWalk.js";
import Killable from "../traits/Killable.js";
import Physics from "../traits/Physics.js";
import Solid from "../traits/Solid.js";
import Entity from "../Entity.js";
import {loadSpriteSheet} from "../loaders/loadSpriteSheet.js";

function createKoopaFactory(sprite) {
    const walkAnimation = sprite.animations.get("walk");
    const wakeAnimation = sprite.animations.get("wake");

    function routeFrame(koopa) {
        if (koopa.traits.get(KoopaBehavior).state === KoopaBehavior.STATE_HIDING) {
            if (koopa.traits.get(KoopaBehavior).hideTime > 3) return wakeAnimation(koopa.traits.get(KoopaBehavior).hideTime);
            else return "shell";
        }

        if (koopa.traits.get(KoopaBehavior).state === KoopaBehavior.STATE_SLIDING) return "shell";
        else return walkAnimation(koopa.lifetime);
    }

    function drawKoopa(context) {
        sprite.draw(
            routeFrame(this),
            context,
            0, 0,
            this.speed.x > 0
        );
    }

    return function() {
        const koopa = new Entity();

        koopa.size.set(16, 15);
        koopa.offset.y = 8;
        koopa.addTrait(new KoopaBehavior());
        koopa.addTrait(new EnemyWalk());
        koopa.addTrait(new Killable());
        koopa.addTrait(new Physics());
        koopa.addTrait(new Solid());
        koopa.draw = drawKoopa;

        return koopa;
    }
}

export function loadKoopa() {
    return loadSpriteSheet("koopa").then(createKoopaFactory);
}