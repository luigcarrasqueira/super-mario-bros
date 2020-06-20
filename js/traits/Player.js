import Stomper from "./Stomper.js";
import Trait from "../Trait.js";

const COINS_THRESHOLD = 100;

export default class Player extends Trait {
    constructor() {
        super();

        this.name = "";
        this.lives = 3;
        this.score = 0;
        this.coins = 0;

        this.listen(Stomper.EVENT_STOMP, () => {this.score += 100});
    }

    addLives(amount) {
        this.lives += amount;
    }

    addCoins(amount) {
        this.coins += amount;
        this.queue(function(entity) {
            entity.sounds.add("coin");
        });

        while (this.coins >= COINS_THRESHOLD) {
            this.addLives(1);
            this.coins -= COINS_THRESHOLD;
        }
    } 
}