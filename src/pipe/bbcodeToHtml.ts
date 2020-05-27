import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'bbcodeToHtml'})
export class BBcodeToHtml implements PipeTransform {
  transform(text: string): string {
    let textTranformed = text.replace('\[i\]', '<i>');
    return textTranformed;
  }
}
