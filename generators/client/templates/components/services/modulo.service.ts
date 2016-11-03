import { Injectable }         from '@angular/core';
import { Http }               from '@angular/http';
import { ServiceComponent }   from '../../shared/service.component';
import { <%= generatorModel %> }            from '../models/<%= generatorName %>';


@Injectable()
export class <%= generatorModel %>Service extends ServiceComponent {

  constructor (protected objeto: <%= generatorModel %>, protected http: Http) {
    super(objeto, http);
    this.serviceURL = 'http://localhost:8080/<%= generatorName %>';
  }



}
