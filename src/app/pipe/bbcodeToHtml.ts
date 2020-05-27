import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'bbcodeToHtml'})
export class BBcodeToHtml implements PipeTransform {
  transform(text: string): string {
    let textTranformed = text.replace(new RegExp('\\[i\\]', 'g'), '<i>');
    textTranformed = textTranformed.replace(new RegExp('\\[/i\\]', 'g'), '</i>')
    textTranformed = textTranformed.replace(new RegExp('\\[/url\\]', 'g'), '</a>')
    textTranformed = textTranformed.replace(new RegExp('\\[url.+href=', 'g'), '<a href=')
    textTranformed = textTranformed.replace(new RegExp('\\]', 'g'), '</a>')
    return textTranformed;
  }
}
