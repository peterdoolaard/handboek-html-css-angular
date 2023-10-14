import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'escapeMarkup',
  pure: true
})
export class EscapeMarkupPipe implements PipeTransform {

  transform(value: string): string {
    return value.replaceAll(/\t/g, ' ').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }
}

