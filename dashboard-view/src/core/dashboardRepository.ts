import { ColorPixelEvent } from './ColorPixelEvent';
import { PixelGrid } from './pixelGrid';

export abstract class DashboardRepository {

  abstract createGrid(gridId: string): void;

  abstract updateGrid(grid: string, event: ColorPixelEvent);
}
