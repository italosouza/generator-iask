import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/auth.guard';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

export const routes: Routes = [
  // default root page
  { path: '', redirectTo: 'painel', pathMatch: 'full' },
  { path: 'login', redirectTo: 'auth/login' },
  { path: 'register', redirectTo: 'auth/register' },

  // pages at root level
  // invidivual component route declared at *module*-routing.module.ts
  {
    path: '', component: FullLayoutComponent, data: { title: 'Home' }, canActivate: [AuthGuard],
    children: [
      { path: 'painel', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
      { path: 'icons', loadChildren: './icons/icons.module#IconsModule' },
      { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' },
      { path: 'charts', loadChildren: './chartjs/chartjs.module#ChartJSModule' }
    ]
  },
  {
    path: 'auth', component: SimpleLayoutComponent, data: { title: 'Autenticar' },
    children: [
      { path: '', loadChildren: './login/login.module#LoginModule' }
    ]
  },
  // pages at 'pages' level
  {
    path: 'pages', component: SimpleLayoutComponent, data: { title: 'Pages' },
    children: [
      { path: '', loadChildren: './pages/pages.module#PagesModule', },
      { path: '', loadChildren: './login/login.module#LoginModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
