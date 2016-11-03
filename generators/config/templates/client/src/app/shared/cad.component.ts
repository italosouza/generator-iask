import { ServiceComponent } from './service.component';
import { ActivatedRoute } from '@angular/router';
import { CoreObject } from './core.object';

export class CadComponent {

  protected loading = false;
  protected service: ServiceComponent;
  protected objeto: CoreObject;
  protected route: ActivatedRoute;

  public lista: Array<Object>;
  public rota;
  public aviso: string;

  constructor(protected pRoute: ActivatedRoute) {
    this.route = pRoute;
    this.rota = this.route.snapshot.data;
  }

  public carregarObjeto() {
    let nId = this.route.snapshot.params['id'];
    if (nId) {
      this.loading = true;
      this.service.getObjeto(nId)
        .subscribe(
          resultado => this.objeto = resultado,
          err => {
            this.aviso = err;
            this.loading = false;
            console.log(err);
          },
          () => { this.loading = false; });
    }
  }

  public salvar() {
    if (this.objeto._id === '') {
      this.adicionar();
    }
    else {
      this.atualizar();
    }
  }

  private adicionar() {
    this.loading = true;
    this.service.adicionar(this.objeto)
      .subscribe(
        resultado => {
          this.objeto = resultado;
          this.aviso = 'Registro adicionado com sucesso.';
        },
        err => {
          this.aviso = err;
          this.loading = false;
          console.log(err);
        },
        () => { this.loading = false; });
  }

  private atualizar() {
    this.loading = true;
    this.service.atualizar(this.objeto)
      .subscribe(
        resultado => {
          // this.objeto = resultado;
          this.aviso = 'Registro atualizado com sucesso.';
        },
        err => {
          this.aviso = err;
          this.loading = false;
          console.log(err);
        },
        () => { this.loading = false; });
  }
}