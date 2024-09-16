import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { DrawGridComponent } from './draw-grid/draw-grid.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'draw-grid/:gridId', component: DrawGridComponent },
  ];
