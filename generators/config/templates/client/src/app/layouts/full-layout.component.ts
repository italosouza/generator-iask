import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };
  public loggedUser;

  constructor(private auth: AuthenticationService) { }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public ngOnInit(): void {
    this.loggedUser = this.auth.loggedUser;
  }

  public logout(): void {
    this.auth.logout();
  }
}
