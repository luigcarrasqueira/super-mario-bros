export default class EventEmitter {
    constructor() {
        this.listeners = [];
    }

    listen(name, callback) {
        this.listeners.push({name, callback});
    }

    emit(name,  ...args) {
        this.listeners.forEach(function(listener) {
            if (listener.name === name) {
                listener.callback(...args);
            }
        });
    }
}