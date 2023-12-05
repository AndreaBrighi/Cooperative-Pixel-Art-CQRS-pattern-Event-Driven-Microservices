import { Point } from './Point';

export class ColorPixelEvent {
  pixel: Point;
  color: string;

  constructor(pixel: Point, color: string) {
    this.pixel = pixel;
    this.color = color;
  }
}
