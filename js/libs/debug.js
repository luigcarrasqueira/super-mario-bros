export function setupMouseControl(canvas, entity, camera) {
    let lastEvent;

    ["mousedown", "mousemove"].forEach(function(eventType) {
        canvas.addEventListener(eventType, function(event) {
            if (event.buttons === 1) {
                entity.speed.set(0, 0);
                entity.position.set(
                    event.offsetX + camera.position.x,
                    event.offsetY + camera.position.y
                );
            } else if (
                event.buttons === 2 &&
                lastEvent &&
                lastEvent.buttons === 2 &&
                lastEvent.type === "mousemove"
            ) {
                camera.position.x -= event.offsetX - lastEvent.offsetX;
                // camera.position.y -= event.offsetY - lastEvent.offsetY;
            }

            lastEvent = event;
        });
    });

    canvas.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    });
}