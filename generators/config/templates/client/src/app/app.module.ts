// core modules
import { NgModule }                     from '@angular/core';
import { BrowserModule }                from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy }         from '@angular/common';
import { AppComponent }                 from './app.component';
import { routing }                      from './app.routing';
import { Ng2BootstrapModule }           from 'ng2-bootstrap/ng2-bootstrap';
import { ChartsModule }                 from 'ng2-charts/ng2-charts';

// shared
import { SIDEBAR_TOGGLE_DIRECTIVES }    from './shared/sidebar.directive';
import { AsideToggleDirective }         from './shared/aside.directive';
import { BreadcrumbsComponent }         from './shared/breadcrumb.component';
import { NAV_DROPDOWN_DIRECTIVES }      from './shared/nav-dropdown.directive';

// routes
import { HttpModule, JsonpModule }      from '@angular/http';

// Layouts
import { FullLayoutComponent }          from './layouts/full-layout.component';
import { SimpleLayoutComponent }        from './layouts/simple-layout.component';

// Pages
import { p404Component }                from './pages/404.component';
import { p500Component }                from './pages/500.component';
import { LoginComponent }               from './pages/login.component';
import { RegisterComponent }            from './pages/register.component';

// auth
import { AuthenticationService }        from './pages/authentication.service';

// Painel
import { PainelComponent }              from './painel/components/painel.component';

// modulos
//Importe os modulos aqui!
// import { ExemploModule }                  from './exemplo/exemplo.module';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        JsonpModule,
        Ng2BootstrapModule,
        ChartsModule,
        //declare os modulos aqui!
        // ExemploModule
        
    ],
    declarations: [
        AppComponent,
        FullLayoutComponent,
        SimpleLayoutComponent,
        p404Component,
        p500Component,
        LoginComponent,
        RegisterComponent,
        NAV_DROPDOWN_DIRECTIVES,
        BreadcrumbsComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective,
        PainelComponent
    ],
    providers: [{
        provide: LocationStrategy,
        useClass: HashLocationStrategy,
    },    
    AuthenticationService],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
