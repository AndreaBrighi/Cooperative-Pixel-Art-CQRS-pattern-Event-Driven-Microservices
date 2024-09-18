import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PixelGridService } from '../pixel-grid.service';
import { PixelGridWebsocketService } from '../pixel-grid-websocket.service';
import { MQTTDto } from '../dto/mqttDto';
import { PixelDto } from '../dto/PixelDto';

@Component({
  selector: 'app-pixel-grid',
  templateUrl: './pixel-grid.component.html',
  styleUrls: ['./pixel-grid.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class PixelGridComponent implements OnInit, OnDestroy {

  private BLACK: string = '#000000'
  private WHITE: string = '#FFFFFF'

  @Input({ required: true })
  id: string | null = null;
  @Input({ required: true }) selectedColor: string = this.BLACK;

  grid!: string[][];

  constructor(private httpService: PixelGridService, private wsService: PixelGridWebsocketService) {
  }

  ngOnDestroy(): void {
    this.wsService.unsubscribe(this.id!);
  }

  ngOnInit(): void {
    console.log(this.id)
    this.wsService.subscribeNewTopic<MQTTDto<PixelDto>>(this.id!, (message)=> {
        let data = message.data;
        this.changePixelColor(data.point.y, data.point.x, data.color);
      }
    );
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
