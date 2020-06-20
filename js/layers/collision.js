function createEntityLayer(entities) {
    return function(context, camera) {
        context.strokeStyle = "red";

        entities.forEach(function(entity) {
            context.beginPath();
            context.rect(
                entity.bounds.left - camera.position.x,
                entity.bounds.top - camera.position.y,
                entity.size.x,
                entity.size.y
            );
            context.stroke();
        });
    }
}

function createTileCandidateLayer(tileResolver) {
    const resolvedTiles = [];
    const tileSize = tileResolver.tileSize;
    const getByIndexOriginal = tileResolver.getByIndex;

    tileResolver.getByIndex = function(x, y) {
        resolvedTiles.push({x, y});

        return getByIndexOriginal.call(tileResolver, x, y);
    }

    return function(context, camera) {
        context.strokeStyle = "blue";

        resolvedTiles.forEach(function({x, y}) {
            context.beginPath();
            context.rect(
                x*tileSize - camera.position.x,
                y*tileSize - camera.position.y,
                tileSize,
                tileSize
            );
            context.stroke();
        });

        resolvedTiles.length = 0;
    }
}

export function createCollisionLayer(world) {
    const drawTileCandidates = world.tileCollider.resolvers.map(createTileCandidateLayer);
    const drawBoundingBoxes = createEntityLayer(world.entities);

    return function(context, camera) {
        drawTileCandidates.forEach(function(draw) {
            draw(context, camera)
        });
        drawBoundingBoxes(context, camera);
    }
}