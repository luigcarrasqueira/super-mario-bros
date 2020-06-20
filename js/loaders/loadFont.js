import SpriteSheet from "../SpriteSheet.js";
import Font from "../Font.js";
import {loadImage} from "./loadImage.js";

const CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ©-*!@ ";

export function loadFont() {
    return loadImage("./img/font.png").then(function(image) {
        const fontSprite = new SpriteSheet(image);

        const size = 8;
        const rowLength = image.width;

        for (let [index, char] of [...CHARACTERS].entries()) {
            const x = index*size % rowLength;
            const y = Math.floor(index*size/rowLength)*size;

            fontSprite.define(char, x, y, size, size);
        }

        return new Font(fontSprite, size);
    });
}