import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class UserService {
  options = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
  };

  private readonly API = 'api/user';
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  }

  getUserById(idUser: string): Observable<User> {
    return this.http.get<User>(`${this.API}/${idUser}`);
  }

  postUsers(annotation: User): Observable<User> {
    return this.http.post<User>(this.API, annotation);
  }

  putUser(idUser: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.API}/${idUser}`, user);
  }

  deleteUser(idUser: string): Observable<User> {
    return this.http.delete<User>(`${this.API}/${idUser}`);
  }
}
