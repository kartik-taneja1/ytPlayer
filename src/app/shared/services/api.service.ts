import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private snackBar = this.injector.get(MatSnackBar);
  private http = this.injector.get(HttpClient);
  private loader = this.injector.get(LoaderService);
  constructor(private injector: Injector) {}

  private api_endpoint = environment.api_endpoint;

  public get(path: string) {
    return new Promise((resolve) => {
      if (!this.isOnline) resolve(false);
      this.loader.start();
      const headers = this.getHeaders();

      const next = (res) => {
        this.loader.stop();
        if (res?.message) this.snackBar.open(res.message);
        resolve(res.body);
      };
      const error = (err) => {
        this.loader.stop();
        console.log(err);
        this.snackBar.open(err?.message || 'Something went wrong');
        resolve(false);
      };
      this.http
        .get(this.api_endpoint + path, { headers })
        .subscribe({ next, error });
    });
  }

  public post(path: string, body: any) {
    return new Promise((resolve) => {
      if (!this.isOnline) resolve(false);
      this.loader.start();
      const headers = this.getHeaders();

      const next = (res) => {
        this.loader.stop();
        if (res?.message) this.snackBar.open(res.message);
        resolve(res.body);
      };
      const error = (err) => {
        this.loader.stop();
        console.log(err);
        this.snackBar.open(err?.message || 'Something went wrong');
        resolve(false);
      };

      this.http
        .post(this.api_endpoint + path, body, { headers })
        .subscribe({ next, error });
    });
  }

  public getRawFile(path: string) {
      if (!this.isOnline) return EMPTY;
      const headers = this.getHeaders();

      const error = (err) => {
        this.loader.stop();
        console.log(err);
        this.snackBar.open(err?.message || 'Something went wrong');
        return EMPTY;
      };

      return this.http
        .get(this.api_endpoint + path, {
          headers,
          responseType: 'blob',
          reportProgress: true,
          observe: 'events',
        });
        // .pipe(catchError(error));
  }

  // common functions below
  private get isOnline() {
    if (!navigator.onLine) {
      this.snackBar.open('You are offline. try again later');
    }
    return navigator.onLine;
  }

  private getHeaders(tokenRequired?, formData?) {
    const token: any = 'token';
    if (tokenRequired) {
      return new HttpHeaders()
        .set('authorization', token)
        .set('Content-Type', 'application/json');
    } else if (formData) {
      return new HttpHeaders().set('authorization', token);
    } else {
      return new HttpHeaders().set('Content-Type', 'application/json');
    }
  }
}
