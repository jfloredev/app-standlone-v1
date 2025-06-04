import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorText',
})
export class ShorTextPipe implements PipeTransform {
  transform(value: string): string {
    const MAX_LENGTH = 200;
    if (value.length <= MAX_LENGTH) {
      return value;
    }
    return value.substring(200).concat('...');
  }

}
