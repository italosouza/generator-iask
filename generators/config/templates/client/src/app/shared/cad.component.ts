import { ServiceComponent } from './service.component';
import { ActivatedRoute } from '@angular/router';
import { CoreObject } from './core.object';

export class CadComponent {

  protected service: ServiceComponent;
  protected objeto: CoreObject;
  protected route: ActivatedRoute;

  public loading = false;
  public lista: Array<Object>;
  public rota;
  public aviso: string;

  constructor(protected pRoute: ActivatedRoute) {
    this.route = pRoute;
    this.rota = this.route.snapshot.data;
  }

  public carregarObjeto(onSuccess: any = '') {
    const nId = this.route.snapshot.params['id'];
    if (nId) {
      this.loading = true;
      this.service.getObjeto(nId)
        .subscribe(
        resultado => {
          this.objeto = resultado;
          if (onSuccess) { onSuccess(); }
        },
        err => {
          this.aviso = err;
          this.loading = false;
          console.log(err);
        },
        () => { this.loading = false; });
    }
  }

  public salvar() {
    if (this.objeto._id === null) {
      this.adicionar();
    } else {
      this.atualizar();
    }
  }

  protected adicionar() {
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

  protected atualizar() {
    this.loading = true;
    this.service.atualizar(this.objeto)
      .subscribe(
      resultado => {
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