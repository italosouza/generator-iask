import { Component, OnInit }      from '@angular/core';
import { Http }                   from '@angular/http';
import { ActivatedRoute }         from '@angular/router';
import { CadComponent }           from '../../shared/cad.component';
import { <%= generatorModel %> }                from '../models/<%= generatorName %>';
import { <%= generatorModel %>Service }        from '../services/<%= generatorName %>.service';

@Component({
  templateUrl: './<%= generatorName %>.cad.component.html',
  styleUrls: ['./<%= generatorName %>.component.css']
})
export class <%= generatorModel %>CadComponent extends CadComponent implements OnInit {

  public objeto = new <%= generatorModel %>();

  constructor(private http: Http, protected pRoute: ActivatedRoute) { 
    super(pRoute);
    this.service = new <%= generatorModel %>Service(this.objeto, http);
  }

  ngOnInit() {
    this.carregarObjeto();
  }

}
