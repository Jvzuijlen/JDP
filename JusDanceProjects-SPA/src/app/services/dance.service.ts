import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { DanceCourseType } from '@models/dance-course-type';

@Injectable({
  providedIn: 'root'
})
export class DanceService {
  baseUrl = environment.baseApiUrl + 'dance/';

  constructor(private http: HttpClient) {}

  getDanceCourseTypes(): Observable<DanceCourseType[]> {
    return this.http.get<DanceCourseType[]>(this.baseUrl + 'coursetypes');
  }
}
