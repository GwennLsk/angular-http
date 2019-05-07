import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
export interface Config {
  heroesUrl: string;
  textfile: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = 'assets/config.json'

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get(this.configUrl)
      .pipe(
        retry(3),
        catchError(this.handleError));
  }

  getConfig2(){
    return this.http.get<Config>(this.configUrl);
  }

  getConfigRespoonse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' }
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}` +
        `body was: ${error.error}`
      );
    }
    return throwError(
      'something bad happened; please try again later '
    );
  }
}
