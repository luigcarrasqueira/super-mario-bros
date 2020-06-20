import Vector2 from "./math/Vector2.js";

export default class Camera {
    constructor() {
        this.position = new Vector2();
        this.size = new Vector2(256, 224);
    }
}