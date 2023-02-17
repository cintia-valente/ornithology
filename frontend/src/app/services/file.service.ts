import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bird } from '../model/bird.model';

@Injectable({ providedIn: 'root' })
export class FileService {
  options = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
  };

  private readonly API = 'api/files';
  constructor(private http: HttpClient) {}

  getFiles(idFile: string): Observable<any> {
    return this.http.get<any>(`${this.API}/${idFile}`);
  }
}
