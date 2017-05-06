import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Usuario } from '../models/usuario';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {
  private loggedIn: boolean = false;
  private serviceURL: string;

  public loggedUser: Usuario;

  constructor(private http: Http, private _router: Router) {
    this.serviceURL = `${environment.API_ENDPOINT}/usuario`;

    this.loggedIn = !!sessionStorage.getItem('auth_token');
    if (this.loggedIn) {
      this.loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'));
    }
  }

  public login(user: Usuario) {
    const headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
      .post(`${this.serviceURL}/login/`, user, { headers })
      .map(res => res.json())
      .map((res) => {
        if (res) {
          sessionStorage.setItem('auth_token', res);
          sessionStorage.setItem('loggedUser', JSON.stringify(user));
          this.loggedIn = true;
          this.loggedUser = user;
        }
        return res;
      });
  }

  public create(user: Usuario) {
    const headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
      .post(this.serviceURL, user, { headers })
      .map(res => res.json())
      .map((res) => {
        if (res) {
          sessionStorage.setItem('auth_token', res);
          sessionStorage.setItem('loggedUser', JSON.stringify(user));
          this.loggedIn = true;
          this.loggedUser = user;
        }
        return res;
      });
  }

  public logout(): void {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('loggedUser');
    this.loggedIn = false;
    this._router.navigate(['login']);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  checkCredentials() {
    if (sessionStorage.getItem('auth_token') === null) {
      this._router.navigate(['login']);
    }
  }
}
