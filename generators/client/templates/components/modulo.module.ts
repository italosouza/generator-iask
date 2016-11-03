import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule }         from '@angular/router';

import { <%= generatorModel %>CadComponent } from './components/<%= generatorName %>.cad.component';
import { <%= generatorModel %>ConsComponent } from './components/<%= generatorName %>.cons.component';

import { <%= generatorModel %>Service } from './services/<%= generatorName %>.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule

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
export class <%= generatorModel %>Module {
}

