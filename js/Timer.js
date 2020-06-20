export default class Timer {
    constructor(deltaTime = 1/60) {
        this.deltaTime = deltaTime;
        this.accumulatedTime = 0;
        this.lastTime = null;
    }

    updateProxy(time) {
        if (this.lastTime) {
            this.accumulatedTime += (time - this.lastTime)/1000;

            if (this.accumulatedTime > 1) this.accumulatedTime = 1;

            while (this.accumulatedTime > this.deltaTime) {
                this.loop(this.deltaTime);
                
                this.accumulatedTime -= this.deltaTime;
            }
        }
    
        this.lastTime = time;

        this.enqueue();
    }

    enqueue() {
        requestAnimationFrame((time) => this.updateProxy(time));
    }

    start() {
        this.enqueue();
    }
}