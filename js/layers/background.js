import TileResolver from "../TileResolver.js";

export function createBackgroudLayer(world, tiles, sprites) {
    const buffer = document.createElement("canvas");
    buffer.width = 272;
    buffer.height = 240;

    const context = buffer.getContext("2d");

    const resolver = new TileResolver(tiles);

    function redraw(startIndex, endIndex) {
        context.clearRect(0, 0, buffer.width, buffer.height);

        for (let x = startIndex; x <= endIndex; ++x) {
            const column = tiles.grid[x];

            if (column) {
                column.forEach(function(tile, y) {
                    if (sprites.animations.has(tile.name)) sprites.drawAnimation(tile.name, context, x - startIndex, y, world.totalTime);
                    else sprites.drawTile(tile.name, context, x - startIndex, y);
                });
            }
        }
    }

    return function(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.position.x);
        const drawTo = drawFrom + drawWidth;

        redraw(drawFrom, drawTo);

        context.drawImage(
            buffer,
            Math.round(-camera.position.x%16),
            Math.round(-camera.position.y)
        );
    }
}