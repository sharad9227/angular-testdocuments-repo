import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'linebreak'
})

export class LinebreakPipe implements PipeTransform {
    transform(value: string, args: string[]): string {
        if (typeof value != 'undefined' && value != null) {
            return value.replace(/(.{36})/g, '$1<br>');
        }
    }
}
