import {loadBulletBill} from "../entities/bulletBill.js";
import {loadGoomba} from "../entities/goomba.js";
import {loadCannon} from "../entities/cannon.js";
import {loadKoopa} from "../entities/koopa.js";
import {loadMario} from "../entities/mario.js";

export function loadEntities(audioContext) {
    const entityFactories = {};

    function addAs(name) {
        return function(factory) {
            entityFactories[name] = factory;
        }
    }

    return Promise.all([
        loadMario(audioContext).then(addAs("mario")),
        loadGoomba().then(addAs("goomba")),
        loadKoopa().then(addAs("koopa")),
        loadBulletBill().then(addAs("bulletBill")),
        loadCannon(audioContext).then(addAs("cannon"))
    ]).then(function() {
        return entityFactories;
    });
}