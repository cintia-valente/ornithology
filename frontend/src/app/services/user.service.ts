import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  options = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
  };

  private readonly API = 'api/user';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  }

  getUserById(idUser: any): Observable<User> {
    return this.http.get<User>(`${this.API}/${idUser}`);
  }

  // putUser(idUser: any, data: User): Observable<User> {
  //   return this.http.put<User>(`${this.API}/${idUser}`, data);
  // }

  putUser(idUser: any, data: User): Observable<User> {
    //debugger;
    const body = {
      id: data.idUser,
      name: data.name,
      email: data.email,
      password: data.password,
    };
    console.log(body);

    return this.http.put<User>(`${this.API}/${idUser}`, body);
  }
}
