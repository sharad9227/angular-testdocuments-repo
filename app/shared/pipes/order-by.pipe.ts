import { Pipe, PipeTransform } from '@angular/core';
@Pipe({  name: 'orderBy' })
export class OrderByPipe implements PipeTransform {

    transform(records: Array<any>, args?: any): any {
        let str1: any;
        let str2: any;
        return records.sort(function(a, b){
            if(args.property != 'modified'){
                if(a[args.property] < b[args.property]){
                    return -1 * args.direction;
                }
                else if( a[args.property] > b[args.property]){
                    return 1 * args.direction;
                }
                else{
                    return 0;
                }
            }else{
                str1 = new Date(a[args.property]);
                str2 = new Date(b[args.property]);
                if(str1 < str2){
                    return -1 * args.direction;
                }
                else if( str1 > str2){
                    return 1 * args.direction;
                }
                else{
                    return 0;
                }
            }            
        });
    };
}