import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PixelGridComponent } from './pixel-grid/pixel-grid.component';
import { ColorPickerModule } from 'ngx-color-picker';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PixelGridComponent, ColorPickerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gui';
  color: string = '#000000';

  constructor(){

  }
}
