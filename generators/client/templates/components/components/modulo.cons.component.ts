import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ConsComponent } from '../../shared/cons.component';
import { <%= generatorModel %> } from '../models/<%= generatorName %>';
import { <%= generatorModel %>Service } from '../services/<%= generatorName %>.service';

@Component({
  templateUrl: './<%= generatorName %>.cons.component.html',
  styleUrls: ['./<%= generatorName %>.component.css']
})
export class <%= generatorModel %>ConsComponent extends ConsComponent implements OnInit {

  public filtro = new <%= generatorModel %>();
  public objeto: <%= generatorModel %>;

  constructor(private http: Http, protected pRoute: ActivatedRoute) {
    super(pRoute);
    this.service = new <%= generatorModel %>Service(this.objeto, http);
    this.carregarDados();
  }

  ngOnInit() { }

}