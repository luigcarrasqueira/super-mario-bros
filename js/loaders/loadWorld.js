import WorldTimer from "../traits/WorldTimer.js";
import Trigger from "../traits/Trigger.js";
import Matrix from "../math/Matrix.js";
import Entity from "../Entity.js";
import World from "../World.js";
import {createBackgroudLayer} from "../layers/background.js";
import {createSpriteLayer} from "../layers/sprite.js";
import {loadSpriteSheet} from "./loadSpriteSheet.js";
import {loadMusicSheet} from "./loadMusic.js";
import {loadPattern} from "./loadPattern.js";
import {loadJSON} from "./loadJSON.js";

function createTimer() {
    const timer = new Entity();
    timer.addTrait(new WorldTimer());

    return timer;
}

function createGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, tile);
    }

    return grid;
}

function* expandSpan(xStart, xLength, yStart, yLength) {
    const xEnd = xStart + xLength;
    const yEnd = yStart + yLength;

    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield {x, y};
        }
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLength, yStart, yLength] = range;

        return expandSpan(xStart, xLength, yStart, yLength);
    } else if (range.length === 3) {
        const [xStart, xLength, yStart] = range;

        return expandSpan(xStart, xLength, yStart, 1);
    } else if (range.length === 2) {
        const [xStart, yStart] = range;

        return expandSpan(xStart, 1, yStart, 1);
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        yield* expandRange(range);
    }
}

function* expandTiles(tiles, patterns) {
    function* walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {         
            for (const {x, y} of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;

                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles;
                    
                    yield* walkTiles(tiles, derivedX, derivedY);
                } else {
                    yield {
                        tile,
                        x: derivedX,
                        y: derivedY
                    }
                }
            }
        }
    }

    yield* walkTiles(tiles, 0, 0);
}

function setupBackgrounds(worldSpec, world, backgroundSprites, patterns) {
    worldSpec.layers.forEach(function(layer) {
        const grid = createGrid(layer.tiles, patterns);
        const backgroundLayer = createBackgroudLayer(world, grid, backgroundSprites);

        world.compositor.layers.push(backgroundLayer);
        world.tileCollider.addGrid(grid);
    });
}

function setupEntities(worldSpec, world, entityFactory) {
    worldSpec.entities.forEach(function({name, position: [x, y]}) {
        const createEntity = entityFactory[name];
        const entity = createEntity();
        
        entity.position.set(x, y);
        world.entities.add(entity);
    });

    const spriteLayer = createSpriteLayer(world.entities);

    world.compositor.layers.push(spriteLayer);
}

function setupTriggers(worldSpec, world) {
    if (!worldSpec.triggers) return;

    for (const triggerSpec of worldSpec.triggers) {
        const trigger = new Trigger();
        const entity = new Entity();
        
        trigger.conditions.push(function(entity, touches, gameContext, world) {
            world.events.emit(World.EVENT_TRIGGER, triggerSpec, entity, touches);
        });

        entity.addTrait(trigger);
        entity.position.set(triggerSpec.position[0], triggerSpec.position[1]);
        entity.size.set(64, 64);

        world.entities.add(entity);
    }
}

function setupBehavior(world) {
    const timer = createTimer();

    world.entities.add(timer);

    world.events.listen(WorldTimer.EVENT_TIMER_OK, function() {
        world.music.playTheme();
    });
    world.events.listen(WorldTimer.EVENT_TIMER_HURRY, function() {
        world.music.playHurryTheme();
    });
}

export function createWorldLoader(entityFactory) {
    return function(name) {
        return loadJSON("./worlds/" + name + ".json").then(function(worldSpec) {
            return Promise.all([
                worldSpec,
                loadSpriteSheet(worldSpec.spriteSheet),
                loadMusicSheet(worldSpec.musicSheet),
                loadPattern(worldSpec.patternSheet)
            ]).then(function([worldSpec, backgroundSprites, musicPlayer, patterns]) {
                const world = new World();
                world.name = name;
                world.music.setPlayer(musicPlayer);

                setupBackgrounds(worldSpec, world, backgroundSprites, patterns);
                setupEntities(worldSpec, world, entityFactory);
                setupTriggers(worldSpec, world);
                setupBehavior(world);
                
                return world;
            });
        });
    }
}
