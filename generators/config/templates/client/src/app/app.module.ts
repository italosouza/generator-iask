import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';
import { HttpModule, JsonpModule } from '@angular/http';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import { AuthGuard } from './shared/auth.guard';
import { AuthenticationService } from './login/services/authentication.service';

import { DinheiroPipe } from "./shared/dinheiro.pipe";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    JsonpModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    DinheiroPipe
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    AuthenticationService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
