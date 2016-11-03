import { ServiceComponent } from './service.component';

export class ConsComponent {

  protected loading = false;
  protected filtroHabilitado = false;
  protected service: ServiceComponent;
  protected objeto: Object;
  
  public paginacao: Array<any>;
  public aviso: string;
  public lista: Array<Object>;

  constructor() { }

  public carregarDados() {
    this.loading = true;
    this.aviso = '';
    this.service.getLista()
      .subscribe(
        resultado => this.lista = resultado,
        err => {
          this.aviso = err;
          this.loading = false;
          console.log(err);
        },
        () => { this.loading = false; });
    }

  public excluir(objeto) {
    this.loading = true;
    this.service.excluir(objeto)
      .subscribe(
        resultado => {
          this.aviso = resultado;
          this.lista.splice(this.lista.indexOf(objeto), 1);
        },
        err => {
          this.aviso = err;
          this.loading = false;
          console.log(err);
        },
        () => { this.loading = false; });
  }
}