import { PointDto } from '../../controllers/dto/PointDto';

export class ColorPixelCommand {
  color: string;
  point: PointDto;

  constructor(color: string, point: PointDto) {
    this.color = color;
    this.point = point;
  }
}
