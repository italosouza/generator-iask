import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CoreObject } from './core.object';

// Import RxJs required methods
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class ServiceComponent {

  protected jwToken: string;
  protected serviceURL = 'http://localhost:8080/receita';

  constructor(protected pObjeto: CoreObject, protected http: Http) {
    this.jwToken = localStorage.getItem('auth_token');
  }

  protected getHeader(): Headers {
      let headers = new Headers();
      headers.append('x-auth', this.jwToken);
      return headers;
  }

  public getObjeto(id): Observable<any> {
    let options = new RequestOptions({ headers: this.getHeader() });

    return this.http.get(`${this.serviceURL}/${id}/`, options)
      .map((res: Response) => res.json());
    }

  public getLista(): Observable<any[]> {
    let options = new RequestOptions({ headers: this.getHeader() });

    return this.http.get(this.serviceURL, options)
      .map((res: Response) => res.json());
  }

  public adicionar (body: CoreObject): Observable<any> {
    let options = new RequestOptions({ headers: this.getHeader() });

    return this.http.post(this.serviceURL, body, options)
      .map((res: Response) => res.json());
  }

  public atualizar (body: CoreObject): Observable<any> {
    let options = new RequestOptions({ headers: this.getHeader() });

    return this.http.put(`${this.serviceURL}/${body._id}/`, body, options)
      .map((res: Response) => res.json());
  }

  public excluir (objeto: CoreObject): Observable<string> {
    let options = new RequestOptions({ headers: this.getHeader() });

    return this.http.delete(`${this.serviceURL}/${objeto._id}`, options)
      .map((res: Response) => res.json());
  }
}