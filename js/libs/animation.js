export function createAnimation(frames, speed) {
    return function(distance) {
        const frameIndex = Math.floor(distance/speed) % frames.length;
        const frameName = frames[frameIndex];

        return frameName;
    }
}