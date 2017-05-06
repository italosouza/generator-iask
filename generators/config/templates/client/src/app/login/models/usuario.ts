import { CoreObject } from '../../shared/core.object';

export class Usuario extends CoreObject {

  public nome: string;
  public senha: string;
  public email: string;

  constructor(nome: string, senha: string) {
    super();
    this.nome = nome;
    this.senha = senha;
  }

}
