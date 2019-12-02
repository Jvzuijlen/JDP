import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DanceService {
  baseUrl = environment.baseApiUrl + 'dance/';

  constructor(private http: HttpClient) {}

  getDanceCourseType() {
    return this.http.get(this.baseUrl + 'coursetypes');
  }
}
