export function loadImage(url) {
    return new Promise(function(resolve) {
        const image = new Image();
        image.addEventListener("load", function() {
            resolve(image);
        });
        image.src = url;
    });
}