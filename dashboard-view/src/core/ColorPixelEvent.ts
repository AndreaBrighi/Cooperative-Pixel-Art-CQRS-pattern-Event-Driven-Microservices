import { Point } from '../core/Point';

export class ColorPixelEvent {
  point: Point;
  color: string;

  constructor(point: Point, color: string) {
    this.point = point;
    this.color = color;
  }
}
