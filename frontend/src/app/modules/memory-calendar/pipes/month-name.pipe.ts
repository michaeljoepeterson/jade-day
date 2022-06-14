import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  transform(date: Date): string {
    return date.toLocaleString('default', { month: 'long' })
  }
}
