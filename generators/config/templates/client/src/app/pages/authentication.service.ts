import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Http, Headers } from '@angular/http';

export class User {
  constructor(
    public nome: string,
    public senha: string) { }
}


@Injectable()
export class AuthenticationService {

  private loggedIn = false;
  private serviceURL = 'http://localhost:8080/usuario/login';

  constructor(private http: Http, private _router: Router) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(user: User) {
    let headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http
      .post(
        this.serviceURL,
        user,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res) {
          localStorage.setItem('auth_token', res);
          this.loggedIn = true;
        }
        return res;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._router.navigate(['Login']);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

   checkCredentials() {
    if (localStorage.getItem('auth_token') === null) {
        this._router.navigate(['Login']);
    }
  }
}
