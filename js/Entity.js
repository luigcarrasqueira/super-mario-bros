import EventBuffer from "./EventBuffer.js";
import BoundingBox from "./BoundingBox.js";
import AudioBoard from "./AudioBoard.js";
import Vector2 from "./math/Vector2.js";
import Trait from "./Trait.js";

export default class Entity {
    constructor() {
        this.position = new Vector2();
        this.speed = new Vector2();
        this.size = new Vector2();
        this.offset = new Vector2();
        this.bounds = new BoundingBox(this.position, this.size, this.offset);
        this.audio = new AudioBoard();
        this.sounds = new Set();
        this.canCollide = true;
        this.lifetime = 0;
        this.traits = new Map();
        this.events = new EventBuffer;
    }

    addTrait(trait) {
        this.traits.set(trait.constructor, trait);
    }

    collides(candidate) {
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        });
    }

    obstruct(...args) {
        this.traits.forEach(trait => {
            trait.obstruct(this, ...args);
        });
    }

    playSounds(audio, audioContext) {
        this.sounds.forEach(function(name) {
            audio.play(name, audioContext);
        });

        this.sounds.clear();
    }

    update(gameContext, world) {
        this.traits.forEach(trait => {
            trait.update(this, gameContext, world);
        });

        this.playSounds(this.audio, gameContext.audioContext);
        this.lifetime += gameContext.time;
    }

    draw() {

    }

    finalize() {
        this.events.emit(Trait.EVENT_TASK, this);

        this.traits.forEach((trait) => {
            trait.finalize(this);
        });

        this.events.clear();
    }
}