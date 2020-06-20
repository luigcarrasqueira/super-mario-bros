export default class Font {
    constructor(sprites, size) {
        this.sprites = sprites;
        this.size = size;
    }

    print(text, context, x, y) {
        [...text].forEach((character, position) => {
            this.sprites.draw(
                character,
                context,
                x + position*this.size,
                y
            );
        });
    }
}