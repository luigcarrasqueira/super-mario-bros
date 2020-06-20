import InputRouter from "../InputRouter.js";
import Keyboard from "../Keyboard.js";
import Jump from "../traits/Jump.js";
import Walk from "../traits/Walk.js";

export function setupKeyboard(window) {
    const keyboard = new Keyboard();
    const router = new InputRouter();

    keyboard.listenTo(window);

    keyboard.addMapping("KeyP", function(keyState) {
        if (keyState) {
            router.route(function(entity) {
                entity.traits.get(Jump).start();
            });
        } else {
            router.route(function(entity) {
                entity.traits.get(Jump).cancel();
            });
        }
    });
    keyboard.addMapping("KeyO", function(keyState) {
        router.route(function(entity) {
            entity.turbo(keyState);
        });
    });
    keyboard.addMapping("KeyD", function(keyState) {
        router.route(function(entity) {
            entity.traits.get(Walk).direction += keyState ? 1 : -1;
        });
    });
    keyboard.addMapping("KeyA", function(keyState) {
        router.route(function(entity) {
            entity.traits.get(Walk).direction += keyState ? -1 : 1;
        });
    });

    return router;
}