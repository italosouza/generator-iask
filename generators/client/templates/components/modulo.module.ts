import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { <%= generatorModel %>CadComponent } from './components/<%= generatorName %>.cad.component';
import { <%= generatorModel %>ConsComponent } from './components/<%= generatorName %>.cons.component';
import { <%= generatorModel %>RoutingModule } from './<%= generatorName %>-routing.module';
import { <%= generatorModel %>Service } from './services/<%= generatorName %>.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    <%= generatorModel %>RoutingModule
  ],
  declarations: [
    <%= generatorModel %>CadComponent,
    <%= generatorModel %>ConsComponent
  ],
  providers: [
    <%= generatorModel %>Service
  ],
  exports: [
    <%= generatorModel %>CadComponent,
    <%= generatorModel %>ConsComponent
  ]
})
export class <%= generatorModel %>Module { }
