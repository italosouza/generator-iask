import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ServiceComponent } from '../../shared/service.component';
import { <%= generatorModel %> } from '../models/<%= generatorName %>';

@Injectable()
export class <%= generatorModel %>Service extends ServiceComponent {

  constructor(protected objeto: <%= generatorModel %>, protected http: Http) {
    super(objeto, http);
    this.setServiceEndPoint('<%= generatorName %>');
  }

  protected mapCoreObject(res: any): <%= generatorModel %> {
    return this.toObject(<%= generatorModel %>, res);
  }
}