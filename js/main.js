import SceneRunner from "./SceneRunner.js";
import TimedScene from "./TimedScene.js";
import Scene from "./Scene.js";
import World from "./World.js";
import Timer from "./Timer.js";
import {createPlayer, createPlayerEnvironment, findPlayers} from "./libs/player.js";
import {createHeadsUpDisplayLayer} from "./layers/headsUpDisplay.js";
import {createIntroScreenLayer} from "./layers/introScreen.js";
import {createCollisionLayer} from "./layers/collision.js";
import {createWorldLoader} from "./loaders/loadWorld.js";
import {loadEntities} from "./loaders/loadEntities.js";
import {createColorLayer} from "./layers/color.js";
import {createTextLayer} from "./layers/text.js";
import {loadFont} from "./loaders/loadFont.js";
import {setupKeyboard} from "./libs/input.js";

document.addEventListener("DOMContentLoaded", function() {
    async function main(canvasName) {
        const canvas = document.createElement(canvasName);
        canvas.width = 256;
        canvas.height = 224;
        document.body.append(canvas);

        const videoContext = canvas.getContext("2d");
        const audioContext = new AudioContext();
        const timer = new Timer();

        const [entityFactory, font] = await Promise.all([
            loadEntities(audioContext),
            loadFont()
        ]);

        const loadWorld = await createWorldLoader(entityFactory);
        const sceneRunner = new SceneRunner();
        const mario = entityFactory.mario();

        createPlayer(mario, "MARIO");

        window.sceneRunner = sceneRunner;

        let buga = false;

        async function runWorld(name) {
            buga = false;

            console.log("loading " + name);
            const loadScreen = new Scene();
            const world = await loadWorld(name);
            const playerEnvironment = createPlayerEnvironment(mario);
            const introScreen = new TimedScene();
            
            loadScreen.compositor.layers.push(createColorLayer("#63adff"));
            loadScreen.compositor.layers.push(createTextLayer(font, "LOADING"));

            mario.position.set(40, 192);

            world.camera.position.y = 8;
            world.entities.add(mario);
            world.entities.add(playerEnvironment);
            world.compositor.layers.push(createCollisionLayer(world));
            world.compositor.layers.push(createHeadsUpDisplayLayer(font, world));

            world.events.listen(World.EVENT_TRIGGER, function(triggerSpec, _entity, touches) {
                if (triggerSpec.type === "goto") {
                    for (const entity of findPlayers(touches)) {
                            runWorld(triggerSpec.name);
                            
                            return;
                    }
                }
            });

            introScreen.compositor.layers.push(createColorLayer("#000"));
            introScreen.compositor.layers.push(createIntroScreenLayer(font, world));
            
            sceneRunner.addScene(loadScreen);
            sceneRunner.runNext();
            sceneRunner.addScene(introScreen);
            sceneRunner.addScene(world);
            sceneRunner.runNext();

            buga = true;
        }

        const gameContext = {
            videoContext,
            audioContext,
            entityFactory,
            time: null,
        }

        const inputRouter = setupKeyboard(window);
        inputRouter.addReceiver(mario);

        function initialize() {
            timer.start();
            runWorld("1-1");
        }

        timer.loop = function(time) {
            gameContext.time = time;
            if (buga) sceneRunner.update(gameContext);
        }

        initialize();
    }

    function start() {
        main("canvas");
        window.removeEventListener("click", start);
    }

    window.addEventListener("click", start);
});