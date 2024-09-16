
export class PixelGridDto {
    width: number;
    height: number;
    grid: string[][];

    constructor(width: number, height: number, grid: string[][]) {
        this.width = width;
        this.height = height;
        this.grid = grid;
    }
}
