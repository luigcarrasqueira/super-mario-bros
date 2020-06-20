import SpriteSheet from "../SpriteSheet.js";
import {createAnimation} from "../libs/animation.js";
import {loadImage} from "./loadImage.js";
import {loadJSON} from "./loadJSON.js";

export function loadSpriteSheet(name) {
    return loadJSON("./sprites/" + name + ".json").then(function(sheetSpec) {
        return Promise.all([
            sheetSpec,
            loadImage(sheetSpec.imageURL)
        ]).then(function([
            sheetSpec,
            image
        ]) {
            const sprites = new SpriteSheet(
                image,
                sheetSpec.tileWidth,
                sheetSpec.tileHeight
            );

            if (sheetSpec.tiles) {
                sheetSpec.tiles.forEach(function(tileSpec) {
                    sprites.defineTile(
                        tileSpec.name,
                        ...tileSpec.index
                    );
                });
            }

            if (sheetSpec.frames) {
                sheetSpec.frames.forEach(function(frameSpec) {
                    sprites.define(
                        frameSpec.name,
                        ...frameSpec.rect
                    );
                });
            }

            if (sheetSpec.animations) {
                sheetSpec.animations.forEach(function(animationSpec) {
                    const animation = createAnimation(animationSpec.frames, animationSpec.speed);

                    sprites.defineAnimation(animationSpec.name, animation);
                });
            }

            return sprites;
        });
    });
}
