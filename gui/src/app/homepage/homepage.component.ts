import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PixelGridService } from '../pixel-grid.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

  gridList: Array<String> = []

  constructor(private httpService: PixelGridService) { }

  ngOnInit(): void {
    this.httpService.getGrids().subscribe(result => {
      this.gridList = result
    })
  }

}
