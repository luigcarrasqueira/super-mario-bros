import MusicController from "./MusicController.js";
import EntityCollider from "./EntityCollider.js";
import TileCollider from "./TileCollider.js";
import Camera from "./Camera.js";
import Scene from "./Scene.js";
import {findPlayers} from "./libs/player.js";

function focusPlayer(world) {
    for (const player of findPlayers(world.entities)) {
        world.camera.position.x = Math.max(0, player.position.x - 100);
    }
}

export default class World extends Scene {
    constructor() {
        super();

        this.name = "";
        this.gravity = 1500;
        this.totalTime = 0;
        this.camera = new Camera();
        this.music = new MusicController();
        this.entities = new Set();
        this.entityCollider = new EntityCollider(this.entities);
        this.tileCollider = new TileCollider();
    }

    static EVENT_TRIGGER = Symbol("trigger");

    update(gameContext) {
        for (let entity of this.entities) entity.update(gameContext, this);
        for (let entity of this.entities) this.entityCollider.check(entity);
        for (let entity of this.entities) entity.finalize();

        focusPlayer(this);

        this.totalTime += gameContext.time;
    }

    draw({videoContext}) {
        this.compositor.draw(videoContext, this.camera);
    }

    pause() {
        this.music.pause();
    }
}