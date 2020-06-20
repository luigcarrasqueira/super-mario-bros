export default class Matrix {
    constructor() {
        this.grid = [];
    }

    forEach(callback) {
        this.grid.forEach(function(column, x) {
            column.forEach(function(value, y) {
                callback(value, x, y);
            });
        });
    }

    delete(x, y) {
        const column = this.grid[x];

        if (column) delete column[y];
    }

    set(x, y, value) {
        if (!this.grid[x]) this.grid[x] = [];

        this.grid[x][y] = value;
    }

    get(x, y) {
        const column = this.grid[x];

        if (column) return column[y];
        else return undefined;
    }
}