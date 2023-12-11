import { Subject } from 'rxjs';
import { Point } from './Point';
import { ColorPixelEvent } from './ColorPixelEvent';

export class pixelGrid {
  width: number;
  height: number;
  private _pixels: Array<Array<string>>;
  private subject = new Subject<ColorPixelEvent>();

  constructor(width: number, height: number, pixels: Array<Array<string>>) {
    this.width = width;
    this.height = height;
    this._pixels = pixels;
  }

  get pixels(): ReadonlyArray<ReadonlyArray<string>> {
    return this._pixels;
  }

  public colorPixel(x: number, y: number, color: string): void {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.subject.next(new ColorPixelEvent(new Point(x, y), color));
      this._pixels[x][y] = color;
    }
  }

  get observer() {
    return this.subject.asObservable;
  }
}
