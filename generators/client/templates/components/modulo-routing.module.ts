import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= generatorModel %>CadComponent } from './components/<%= generatorName %>.cad.component';
import { <%= generatorModel %>ConsComponent } from './components/<%= generatorName %>.cons.component';

const routes: Routes = [
  { path: '', redirectTo: 'consultar' },
  { path: 'consultar', component: <%= generatorModel %>ConsComponent, data: { title: 'Consultar' } },
  { path: 'cadastrar', component: <%= generatorModel %>CadComponent, data: { title: 'Cadastrar' } },
  { path: 'cadastrar/:id', component: <%= generatorModel %>CadComponent, data: { title: 'Alterar' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%= generatorModel %>RoutingModule { }
