import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { PixelGridComponent } from '../pixel-grid/pixel-grid.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-draw-grid',
  standalone: true,
  imports: [RouterOutlet, PixelGridComponent, ColorPickerModule, FormsModule],
  templateUrl: './draw-grid.component.html',
  styleUrl: './draw-grid.component.css'
})
export class DrawGridComponent {

  color: string = '#000000';
  id: string | null = null

  constructor( private route: ActivatedRoute, ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('gridId');
    console.log(this.id);
  }
}
