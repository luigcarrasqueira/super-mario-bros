const RELEASED = 0;
const PRESSED = 1;

export default class Keyboard {
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const {code} = event;

        if (!this.keyMap.has(code)) return;

        event.preventDefault();

        const keyState = event.type === "keydown" ? PRESSED : RELEASED;

        if (this.keyStates.get(code) === keyState) return;

        this.keyStates.set(code, keyState);
        this.keyMap.get(code)(keyState);
    }

    listenTo(window) {
        ["keydown", "keyup"].forEach(eventType => {
            window.addEventListener(eventType, event => {
                this.handleEvent(event);
            });
        });
    }
}