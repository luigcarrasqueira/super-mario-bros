export default class AudioBoard {
    constructor() {
        this.buffers = new Map();
    }

    add(name, buffer) {
        this.buffers.set(name, buffer);
    }

    play(name, audioContext) {
        const source = audioContext.createBufferSource();
        source.connect(audioContext.destination);
        source.buffer = this.buffers.get(name);
        source.start();
    }
}