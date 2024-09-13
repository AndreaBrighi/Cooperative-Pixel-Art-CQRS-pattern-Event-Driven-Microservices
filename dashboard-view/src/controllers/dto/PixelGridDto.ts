import { PixelGrid } from "src/core/pixelGrid";

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

export function convertToDto(pixelGrid: PixelGrid): PixelGridDto {
    return new PixelGridDto(pixelGrid.width, pixelGrid.height, pixelGrid.pixels.map(row => [...row]));
}