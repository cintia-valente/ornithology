import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Annotation } from '../model/annotation.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AnnotationService {
  options = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
  };
  constructor(private http: HttpClient) {}

  getAnnotations(): any {
    return this.http.get(`${environment.clientUrl}annotations/`);
  }

  getAnnotationByBirdId(idBird: String, data: any) {
    let params = data ? { data } : ({} as any);

    return this.http.get<Annotation[]>(
      environment.clientUrl + '/annotationsbybird/' + idBird,
      {
        headers: this.options.headers,
        params,
      }
    );
  }

  postAnnotations(data: Annotation): Observable<Annotation> {
    return this.http.post<Annotation>(
      environment.clientUrl + '/api/annotations',
      data,
      this.options
    );
  }

  putAnnotations(
    idAnnotation: string,
    data: Annotation
  ): Observable<Annotation> {
    return this.http.put<Annotation>(
      environment.clientUrl + '/api/annotations/' + idAnnotation,
      data
    );
  }

  deleteAnnotations(idAnnotation: string): Observable<Annotation> {
    return this.http.delete<Annotation>(
      environment.clientUrl + '/api/annotations/' + idAnnotation
    );
  }

  //   private handleError(error: HttpErrorResponse) {
  //     if (error.error instanceof ErrorEvent) {
  //       console.error('An error has occurred:', error.error.message);
  //     } else {
  //       console.error(
  //         `Backend returned code ${error.status}, ` + `body: ${error.error}`
  //       );
  //       return throwError(error.status);
  //     }
  //     return throwError('Something bad happened; please try again later.');
  //   }
}
