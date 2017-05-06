import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public user = new Usuario('admin', 'admin');
  public aviso: string;
  public loading: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  public onSubmit() {
    console.log('onSubmit');
    this.loading = true;
    this.authService.login(this.user)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(['painel']);
        }
      },
      err => {
        this.loading = false;
        this.aviso = err._body;
      });
  }

}
