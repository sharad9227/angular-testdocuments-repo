import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'questionFilter'
})
export class QuestionFilterPipe implements PipeTransform {
  transform(items: any, filter: any, defaultFilter: boolean): any {
    if (!filter) {
      return items;
    }

    if (!Array.isArray(items)) {
      return items;
    }

    if ((filter.hasOwnProperty('questions') &&
          filter.hasOwnProperty('cats') &&
          Array.isArray(items)) &&
          (filter.questions.length > 0 || filter.cats.length > 0)) {
      let filteredItems: any;
      let itemCats: any = [];
      let arrayString: string;
      return items.filter(item => {
        itemCats = [];

        // check if metadataList present or not in question object
        if (item.metadataList != undefined) {
          item.metadataList.forEach(element => {
            itemCats.push(element.categoryId);
          });
        }

        if (filter.questions.length > 0 && (itemCats.length > 0 && filter.cats.length > 0)) {
          // if applying question and category both the filter
          return filter.questions.indexOf(item.type) > -1 && filter.cats.some(r => itemCats.includes(r));
        } else if (filter.questions.length == 0 && (itemCats.length > 0 && filter.cats.length > 0)) {
          // if applying only category filter
          return filter.cats.some(r => itemCats.includes(r));
        } else if (filter.questions.length > 0 && filter.cats.length == 0) {
          // if applying question filter only
          return filter.questions.indexOf(item.type) > -1;
        }
      });
    } else {
        // if no filters applied
        return items;
    }
  }
}
