import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const sortValue = args;
    return (value as []).sort((a: any, b: any) => {
      if (a[sortValue] < b[sortValue]) {
        return -1;
      } else if (a[sortValue] > b[sortValue]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
