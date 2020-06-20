export default class Trait {
    constructor() {
        this.listeners = [];
    }

    static EVENT_TASK = Symbol("task");

    listen(name, callback, count = Infinity) {
        const listener = {name, callback, count};

        this.listeners.push(listener);
    }

    finalize(entity) {
        this.listeners = this.listeners.filter(function(listener) {
            entity.events.process(listener.name, listener.callback);

            return --listener.count;
        });
    }

    queue(task) {
        this.listen(Trait.EVENT_TASK, task, 1)
    }

    collides(us, them) {

    }

    obstruct() {
        
    }

    update() {

    }
}