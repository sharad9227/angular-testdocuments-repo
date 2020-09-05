import { Pipe, PipeTransform } from '@angular/core';
@Pipe({  name: 'paginate' })
export class PaginatePipe implements PipeTransform {

    transform(records: Array<any>, args?: any): any {
        const startingIndex = args.currentPage*args.itemsPerPage;
        const endingIndex = (args.currentPage*args.itemsPerPage) + args.itemsPerPage;
        return records.slice(startingIndex,endingIndex);
    };
}