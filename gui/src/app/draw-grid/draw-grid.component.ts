import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-draw-grid',
  standalone: true,
  imports: [],
  templateUrl: './draw-grid.component.html',
  styleUrl: './draw-grid.component.css'
})
export class DrawGridComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {}

  ngOnInit() {
    const heroId = this.route.snapshot.paramMap.get('id');
    console.log(heroId);
  }
}
