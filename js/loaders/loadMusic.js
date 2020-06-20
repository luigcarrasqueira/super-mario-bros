import MusicPlayer from "../MusicPlayer.js"
import {loadJSON} from "./loadJSON.js";

export function loadMusicSheet(name) {
    return loadJSON("./musics/" + name + ".json").then(function(musicSheet) {
        const musicPlayer = new MusicPlayer();

        for (const [name, track] of Object.entries(musicSheet)) musicPlayer.addTrack(name, track.url);

        return musicPlayer;
    });
}
