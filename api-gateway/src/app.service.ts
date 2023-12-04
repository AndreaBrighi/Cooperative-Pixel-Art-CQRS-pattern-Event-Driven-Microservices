import { Injectable } from '@nestjs/common';

@Injectable()
export class PixelGridService {
  private pixelGrids: string[] = ['Grid1'];

  getPixelGrids(): string[] {
    return this.pixelGrids;
  }
}
