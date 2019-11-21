import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(this.baseUrl + 'login', user);
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }
}
