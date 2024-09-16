import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PointDto } from './dto/PointDto';
import { PixelDto } from './dto/PixelDto';
import { PixelGridDto } from './dto/PixelGridDto';

@Injectable({
  providedIn: 'root'
})
export class PixelGridService {

  private apiUrl = environment.api + "/api"

  constructor(private http: HttpClient) {}

  getGrids(): Observable<String[]> {
    return this.http.get<String[]>(`${this.apiUrl}/pixel-grids`);
  }

  getGridStatus(gridId: string): Observable<PixelGridDto> {
    return this.http.get<PixelGridDto>(`${this.apiUrl}/pixel-grids/${gridId}`);
  }

  setPixelColor(gridId: string, point: PointDto, color: string): Observable<any> {
    let pixel = new PixelDto(point, color);
    return this.http.post(`${this.apiUrl}/pixel-grids/${gridId}/color-pixel`, pixel);
  }

}
