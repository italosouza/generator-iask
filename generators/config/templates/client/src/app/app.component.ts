import { Component, OnDestroy } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';


@Component({
  selector: 'body',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnDestroy {
  private sub: any;

  public loading: boolean = true;

  ngOnDestroy(): any {
    this.sub.unsubscribe();
  }

  constructor(private router: Router) {

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }

    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    if (event instanceof NavigationCancel) {
      this.loading = false;
    }

    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }


}
