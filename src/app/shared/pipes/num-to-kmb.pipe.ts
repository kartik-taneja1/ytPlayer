import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numToKMB',
})
export class NumToKMBPipe implements PipeTransform {
  transform(value: number): string {
    let display: string | number = 0;
    let abbr = '';
    if (value < Math.pow(10, 3)) {
      display = value;
    } else if (value < Math.pow(10, 6)) {
      abbr = 'K';
      display = value / Math.pow(10, 3);
    } else if (value < Math.pow(10, 9)) {
      abbr = 'M';
      display = value / Math.pow(10, 6);
    } else {
      abbr = 'B';
      display = value / Math.pow(10, 9);
    }
    return Math.floor(display * 100) / 100 + abbr;
  }
}
