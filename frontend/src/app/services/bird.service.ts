import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BirdService {
  options = {
    headers: new HttpHeaders().set('Content-type', 'application/json'),
  };
  constructor(private http: HttpClient) {}

  getBirds(): any {
    return this.http.get(environment.clientUrl + '/api/birds/');
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
