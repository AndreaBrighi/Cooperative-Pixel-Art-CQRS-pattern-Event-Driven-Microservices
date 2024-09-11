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

  private BLACK: string = '#000000'
  private WHITE: string = '#FFFFFF'

  @Input() width: number = 10;
  @Input() height: number = 10;
  @Input() selectedColor: string = this.BLACK;

  grid: string[][] = Array.from({ length: this.height }, () =>
    Array.from({ length: this.width }, () => this.WHITE)
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
    let color = this.selectedColor.toUpperCase()
    console.log(color)
    this.grid[rowIndex][colIndex] = this.grid[rowIndex][colIndex] !== color  ? color : this.WHITE;
  }

  changePixelColor(rowIndex: number, colIndex: number, color: String){
    let colorUpperCase = color.toUpperCase();
    this.grid[rowIndex][colIndex] = colorUpperCase;
  }

}
