import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PixelGridService } from '../pixel-grid.service';

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

  @Input({ required: true })
  id: string | null = null;
  @Input({ required: true }) selectedColor: string = this.BLACK;

  grid!: string[][];

  constructor(private httpService: PixelGridService ) {
  }

  ngOnInit(): void {
    console.log(this.id)
    this.httpService.getGridStatus(this.id!).subscribe(result => {
      this.grid = result.grid;
      console.log(result);
    });
    
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
    console.log(rowIndex);
    let newColor = this.grid[rowIndex][colIndex] !== color  ? color : this.WHITE;
    this.grid[rowIndex][colIndex] = newColor;
    this.httpService.setPixelColor(this.id!, { x: colIndex, y: rowIndex }, newColor).subscribe(result=>{
      console.log(result);
    })
  }

  changePixelColor(rowIndex: number, colIndex: number, color: String){
    let colorUpperCase = color.toUpperCase();
    this.grid[rowIndex][colIndex] = colorUpperCase;
  }

}
