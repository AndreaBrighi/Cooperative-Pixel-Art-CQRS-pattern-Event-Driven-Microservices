import { PointDto } from "./PointDto";

export class PixelDto {
    point: PointDto;
    color: string;

    constructor(point: PointDto, color: string) {
        this.point = point;
        this.color = color;
    }
}