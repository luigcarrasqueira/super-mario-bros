export function createSpriteLayer(entities, width = 64, height = 64) {
    const spriteBuffer = document.createElement("canvas");
    spriteBuffer.width = width;
    spriteBuffer.height = height;

    const spriteBufferContext = spriteBuffer.getContext("2d");

    return function(context, camera) {
        for (let entity of entities) {
            spriteBufferContext.clearRect(
                0, 0,
                width, height
            );

            entity.draw(spriteBufferContext);

            context.drawImage(
                spriteBuffer,
                Math.round(entity.position.x - camera.position.x),
                Math.round(entity.position.y - camera.position.y)
            );
        }
    }
}