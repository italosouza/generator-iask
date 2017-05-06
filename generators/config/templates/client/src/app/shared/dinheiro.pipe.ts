import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dinheiro'
})
export class DinheiroPipe implements PipeTransform {

  transform(value: number): string {
    const nValor = value || 0;
    const sValor = nValor.toFixed(2).split('.');
    sValor[0] = sValor[0].split(/(?=(?:...)*$)/).join('.');
    return sValor.join(',');
  }
}
