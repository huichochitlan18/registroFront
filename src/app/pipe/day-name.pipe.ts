import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayName'
})
export class DayNamePipe implements PipeTransform {
  transform(value: number): string {
    //todo con el poderoso chatgpt
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    if (value >= 0 && value <=6) {
      return daysOfWeek[value];
    } else {
      return 'Invalid Day';
    }
  }
}