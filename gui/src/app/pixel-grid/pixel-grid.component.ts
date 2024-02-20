import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pixel-grid',
  templateUrl: './pixel-grid.component.html',
  styleUrls: ['./pixel-grid.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class PixelGridComponent implements OnInit {
  @Input() width: number = 10;
  @Input() height: number = 10;
  @Input() selectedColor: string = 'black';

  grid: string[][] = Array.from({ length: this.height }, () =>
  Array.from({ length: this.width }, () => 'white')
);

  constructor() { }

  ngOnInit(): void {
  }

  getColor(rowIndex: number, colIndex: number): string {
    // Implement your color logic here, e.g.,
    // - Return a default color for each pixel
    // - Use different colors based on row/column
    // - Implement user interaction to change colors
    return this.grid[rowIndex][colIndex];
  }

  togglePixel(rowIndex: number, colIndex: number) {
    this.grid[rowIndex][colIndex] = this.grid[rowIndex][colIndex] === 'white' ? this.selectedColor : 'white';
    }

}
