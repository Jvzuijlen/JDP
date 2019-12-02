import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@models/user';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }
  baseUrl = environment.baseApiUrl + 'users';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }
}
