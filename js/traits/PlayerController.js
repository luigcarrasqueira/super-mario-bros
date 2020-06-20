import Vector2 from "../math/Vector2.js";
import Killable from "./Killable.js";
import Trait from "../Trait.js";

export default class PlayerController extends Trait {
    constructor() {
        super();
        
        this.checkpoint = new Vector2();
        this.player = null;
    }

    setPlayer(entity) {
        this.player = entity;
    }

    update(entity, gameContext, world) {
        if (!world.entities.has(this.player)) {
            this.player.traits.get(Killable).revive();
            this.player.position.set(this.checkpoint.x, this.checkpoint.y);

            world.entities.add(this.player);
        }
    }
}