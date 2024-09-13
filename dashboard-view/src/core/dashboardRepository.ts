import { ColorPixelEvent } from './ColorPixelEvent';

export abstract class DashboardRepository {
  abstract updateGrid(grid: string, event: ColorPixelEvent);
}
