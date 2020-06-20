export function createCameraLayer(cameraToDraw) {
    return function(context, fromCamera) {
        context.strokeStyle = "purple";
        context.beginPath();
        context.rect(
            cameraToDraw.position.x - fromCamera.position.x,
            cameraToDraw.position.y - fromCamera.position.y,
            cameraToDraw.size.x,
            cameraToDraw.size.y
        );
        context.stroke();
    }
}