import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CoreObject } from './core.object';
import { environment } from '../../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServiceComponent {
  private serviceURL: string;

  protected jwToken: string;

  constructor(protected pObjeto: CoreObject, protected http: Http) {
    this.jwToken = sessionStorage.getItem('auth_token');
  }

  protected setServiceEndPoint(psEndpoint: string) {
    this.serviceURL = `${environment.API_ENDPOINT}/${psEndpoint}`;
  }

  protected getServiceEndPoint(): string {
    return this.serviceURL;
  }

  // serialização de objeto para queryString
  protected serializarFiltro(pFiltro: CoreObject, bQueryString: Boolean = true): string {
    const arFiltro = [];
    let sFiltro = '';
    for (const p in pFiltro) {
      if (pFiltro.hasOwnProperty(p) && pFiltro[p] !== null) {
        arFiltro.push(encodeURIComponent(p) + '=' + encodeURIComponent(pFiltro[p]));
      }
    }
    if (bQueryString) {
      sFiltro = '?';
    }
    sFiltro += arFiltro.join('&');
    return sFiltro;
  }

  // método generico para conversão de array em Objetos
  protected toObject<T>(classeReferencia: { new (): T; }, arDados: any): T {
    const novoObjeto: T = new classeReferencia();
    for (const indice in arDados) {
      if (arDados.hasOwnProperty(indice)) {
        novoObjeto[indice] = arDados[indice];
      }
    }
    return novoObjeto;
  }

  protected getHeader(): Headers {
    const headers = new Headers();
    headers.append('x-auth', this.jwToken);
    return headers;
  }

  // realiza o mapeamento do Json para o Objeto
  protected mapCoreObject(res: any): any {
    console.log('Conversão do objeto não realizada na entidade service.');
    return res;
  }

  // realiza o mapeamento de uma coleção de Json em um Array de Objetos
  protected mapCoreCollection(res: any): Array<any> {
    const data: Array<CoreObject> = [];
    for (const item of res) {
      const obj = <CoreObject>this.mapCoreObject(item);
      data.push(obj);
    }
    return data;
  };

  public getObjeto(id): Observable<any> {
    const options = new RequestOptions({ headers: this.getHeader() });

    return this.http.get(`${this.serviceURL}/${id}/`, options)
      .map((res: Response) => this.mapCoreObject(res.json()));
  }

  public getLista(): Observable<any[]> {
    const options = new RequestOptions({ headers: this.getHeader() });

    return this.http.get(this.serviceURL, options)
      .map((res: Response) => this.mapCoreCollection(res.json()));
  }

  public adicionar(body: CoreObject): Observable<any> {
    const options = new RequestOptions({ headers: this.getHeader() });

    return this.http.post(this.serviceURL, body, options)
      .map((res: Response) => this.mapCoreObject(res.json()));
  }

  public atualizar(body: CoreObject): Observable<any> {
    const options = new RequestOptions({ headers: this.getHeader() });

    return this.http.put(`${this.serviceURL}/${body._id}/`, body, options)
      .map((res: Response) => this.mapCoreObject(res.json()));
  }

  public excluir(objeto: CoreObject): Observable<string> {
    const options = new RequestOptions({ headers: this.getHeader() });

    return this.http.delete(`${this.serviceURL}/${objeto._id}`, options)
      .map((res: Response) => res.json());
  }
}
