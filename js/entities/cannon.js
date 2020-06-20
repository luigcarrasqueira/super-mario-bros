import Emitter from "../traits/Emitter.js";
import Entity from "../Entity.js";
import {loadAudioBoard} from "../loaders/loadAudio.js";
import {findPlayers} from "../libs/player.js";

const HOLD_FIRE_THRESHOLD = 30;

function createCannonFactory(audio) {
    function emitBullet(cannon, gameContext, world) {
        let direction = 1;

        for (const player of findPlayers(world.entities)) {
            if (player.position.x > cannon.position.x - HOLD_FIRE_THRESHOLD
            && player.position.x < cannon.position.x + HOLD_FIRE_THRESHOLD) {
                return;
            }

            if (player.position.x < cannon.position.x) direction = -1;
        }
        
        const bulletBill = gameContext.entityFactory.bulletBill();
        bulletBill.speed.x = 80*direction;
        bulletBill.position.copy(cannon.position);
        cannon.sounds.add("shoot");

        world.entities.add(bulletBill);
    }

    return function() {
        const cannon = new Entity();
        const emitter = new Emitter();

        emitter.interval = 4;
        emitter.emitters.push(emitBullet);

        cannon.audio = audio;
        cannon.addTrait(emitter);

        return cannon;
    }
}

export function loadCannon(audioContext) {
    return loadAudioBoard("cannon", audioContext).then(function(audio) {
        return createCannonFactory(audio);
    });
}