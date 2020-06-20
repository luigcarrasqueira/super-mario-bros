export default class Compositor {
    constructor() {
        this.layers = [];
    }
    
    draw(context, camera) {
        this.layers.forEach(function(layer) {
            layer(context, camera);
        });
    }
}