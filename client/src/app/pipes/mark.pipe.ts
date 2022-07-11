import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mark'
})
export class MarkPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }

    const regex = new RegExp(args, 'igm');
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    return value.replace(regex, m => `<span class='highlight'>${m}</span>`);
  }

}
