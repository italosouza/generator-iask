import { Component }        from '@angular/core';
import {AuthenticationService, User} from './authentication.service';
import {Router} from '@angular/router';

@Component({
    templateUrl: 'login.component.html'
})

export class LoginComponent {

  public user = new User('admin', 'admin');
  public aviso: string;

  constructor(private authService: AuthenticationService, private router: Router) { }

  public onSubmit() {
    this.authService.login(this.user)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['painel']);
        }
      },
      err => {
        this.aviso = err._body;
      });
    }

}
