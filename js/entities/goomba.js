import GoombaBehavior from "../traits/GoombaBehavior.js";
import EnemyWalk from "../traits/EnemyWalk.js";
import Killable from "../traits/Killable.js";
import Physics from "../traits/Physics.js";
import Solid from "../traits/Solid.js";
import Entity from "../Entity.js";
import {loadSpriteSheet} from "../loaders/loadSpriteSheet.js";

function createGoombaFactory(sprite) {
    const walkAnimation = sprite.animations.get("walk");

    function routeFrame(goomba) {
        if (goomba.traits.get(Killable).dead) return "stomped";
        else return walkAnimation(goomba.lifetime);
    }

    function drawGoomba(context) {
        sprite.draw(
            routeFrame(this),
            context,
            0, 0
        );
    }

    return function() {
        const goomba = new Entity();

        goomba.size.set(16, 15);
        goomba.addTrait(new GoombaBehavior());
        goomba.addTrait(new EnemyWalk());
        goomba.addTrait(new Killable());
        goomba.addTrait(new Physics());
        goomba.addTrait(new Solid());
        goomba.draw = drawGoomba;

        return goomba;
    }
}

export function loadGoomba() {
    return loadSpriteSheet("goomba").then(createGoombaFactory);
}