export default class Vector2 {
    constructor(x = 0, y = 0) {
        this.set(x, y);
    }
    
    set(x, y) {
        this.x = x;
        this.y = y;
    }

    copy(vector2) {
        this.set(vector2.x, vector2.y);
    }
}