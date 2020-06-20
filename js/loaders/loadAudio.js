import AudioBoard from "../AudioBoard.js";
import {loadJSON} from "./loadJSON.js";

export function loadAudioBoard(name, audioContext) {
    const loadAudio = createAudioLoader(audioContext);
    return loadJSON("./sounds/" + name + ".json").then(function(audioSheet) {
        const audio = new AudioBoard(audioContext);
        const {sfx} = audioSheet;
        const processes = [];

        Object.keys(sfx).forEach(function(name) {
            const {url} = sfx[name];

            const processed = loadAudio(url).then(function(buffer) {
                audio.add(name, buffer);
            });

            processes.push(processed);
        });

        return Promise.all(processes).then(function() {
            return audio;
        });
    });
}

export function createAudioLoader(context) {
    return function(url) {
        return fetch(url).then(function(response) {
            return response.arrayBuffer();
        }).then(function(arrayBuffer) {
            return context.decodeAudioData(arrayBuffer);
        });
    }
}
