import { PointDto } from './PointDto';

export class eventDTO {
  grid: string;
  color: string;
  pixel: PointDto;

  constructor(grid: string, color: string, pixel: PointDto) {
    this.grid = grid;
    this.color = color;
    this.pixel = pixel;
  }
}
