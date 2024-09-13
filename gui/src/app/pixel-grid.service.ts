import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PointDto } from './dto/PointDto';
import { PixelDto } from './dto/PixelDto';

@Injectable({
  providedIn: 'root'
})
export class PixelGridService {

  private apiUrl = environment.api + "/api"

  constructor(private http: HttpClient) {}

  getGrids(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pixel-grids`);
  }

  getGridStatus(gridId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pixel-grids/${gridId}`);
  }

  setPixelColor(gridId: string, point: PointDto, color: string): Observable<any> {
    let pixel = new PixelDto(point, color);
    return this.http.post(`${this.apiUrl}/pixel-grids/${gridId}/color-pixel`, pixel);
  }

}
