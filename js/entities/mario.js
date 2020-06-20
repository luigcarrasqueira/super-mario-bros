import Killable from "../traits/Killable.js";
import Physics from "../traits/Physics.js";
import Stomper from "../traits/Stomper.js";
import Solid from "../traits/Solid.js";
import Jump from "../traits/Jump.js";
import Walk from "../traits/Walk.js"
import Entity from "../Entity.js";
import {loadSpriteSheet} from "../loaders/loadSpriteSheet.js";
import {loadAudioBoard} from "../loaders/loadAudio.js";

const SLOW_DRAG = 1/1500;
const FAST_DRAG = 1/5000;

function createMarioFactory(sprite, audio) {
    const runAnimation = sprite.animations.get("run");

    function routeFrame(mario) {
        if (mario.traits.get(Jump).falling) return "jump";
        if (mario.traits.get(Walk).distance > 0) {
            if (
                mario.speed.x > 0 &&
                mario.traits.get(Walk).direction < 0 ||
                mario.speed.x < 0 &&
                mario.traits.get(Walk).direction > 0
            ) return "break";
            else return runAnimation(mario.traits.get(Walk).distance);
        }

        return "idle";
    }

    function setTurboState(turboOn) {
        this.traits.get(Walk).dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function drawMario(context) {
        sprite.draw(
            routeFrame(this),
            context,
            0, 0,
            this.traits.get(Walk).heading < 0
        );
    }

    return function() {
        const mario = new Entity();

        mario.size.set(12, 15);
        mario.offset.x = 2;
        mario.addTrait(new Killable());
        mario.addTrait(new Physics());
        mario.addTrait(new Stomper());
        mario.addTrait(new Solid());
        mario.addTrait(new Walk());
        mario.addTrait(new Jump());
        mario.traits.get(Killable).removeAfter = 0;
        mario.turbo = setTurboState;
        mario.draw = drawMario;
        mario.turbo(false);
        mario.audio = audio;

        return mario;
    }
}

export function loadMario(audioContext) {
    return Promise.all([
        loadSpriteSheet("mario"),
        loadAudioBoard("mario", audioContext)
    ]).then(function([sprite, audio]) {
        return createMarioFactory(sprite, audio);
    });
}