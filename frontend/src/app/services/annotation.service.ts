import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Annotation } from '../model/annotation.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnnotationService {
  options = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
  };

  private readonly API = 'api/annotation';
  constructor(private http: HttpClient) {}

  getAnnotations(): Observable<Annotation[]> {
    return this.http.get<Annotation[]>(this.API);
  }

  getAnnotationById(idAnnotation: any): Observable<Annotation> {
    return this.http.get<Annotation>(`${this.API}/${idAnnotation}`);
  }

  getAnnotationByBirdId(
    idBird: String,
    data: Annotation
  ): Observable<Annotation[]> {
    let params = data ? { data } : ({} as any);

    return this.http.get<Annotation[]>(this.API + idBird, {
      headers: this.options.headers,
      params,
    });
  }

  postAnnotations(data: Annotation): Observable<Annotation> {
    return this.http.post<Annotation>(this.API, data);
  }

  putAnnotation(
    idAnnotation: string,
    annotation: Annotation
  ): Observable<Annotation> {
    console.log(annotation);

    return this.http.put<Annotation>(`${this.API}/${idAnnotation}`, annotation);
  }

  deleteAnnotations(idAnnotation: string): Observable<Annotation> {
    return this.http.delete<Annotation>(`${this.API}/${idAnnotation}`);
  }
}
