import {loadJSON} from "./loadJSON.js";

export function loadPattern(name) {
    return loadJSON("/sprites/patterns/" + name + ".json");
}