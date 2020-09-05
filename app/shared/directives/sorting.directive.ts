import { Directive, OnInit, Input, Output, Renderer, ElementRef ,EventEmitter } from '@angular/core';

@Directive({selector: '[sortColumn]'})

export class SortDirective implements OnInit {
  @Input() data: any[];
  @Input('sortKey') key: any;
  @Output() sortEvent = new EventEmitter<any>();
  private toggleSort = false;
  private arrayIndex = 0;

  constructor (private el: ElementRef, private renderer: Renderer) {
  }

  ngOnInit () {
    this.renderer.listen(this.el.nativeElement, 'click', (event) => {
      const parentNode = this.el.nativeElement.parentNode;
      const children   = parentNode.children;
      if (this.data && this.key) {
        const sortedData: any = this.sortArray(this.key);
      }
      this.toggleSort = !this.toggleSort;
    });
  }

 assignArrayIndex(data) {
    const list = [];
    this.data = data.map(item => {
        item.index = this.arrayIndex++;
        return item;
    });
}

  sortArray (myKey: string): Array<any> {
    this.arrayIndex = 0 ;
    const tempArray: Array<any> = this.data;    
    tempArray.sort((a, b) => {
        const aKey = a[this.key];
        let str1: any;
        let str2: any;
        if (myKey == 'collection_title' || myKey == 'status'
        || myKey == 'title' || myKey == 'type' || myKey == 'typeDesc') {
          str1 = a[this.key].toLowerCase();
          str2 = b[this.key].toLowerCase();
        } else {
          str1 = new Date(a[this.key]);
          str2 = new Date(b[this.key]);
        }

        if (this.toggleSort) {
          if ((str1 < str2)) {
            return -1;
          }
          if (str1 > str2) {
            return 1;
          }
        } else {
          if (str1 > str2) {
            return -1;
          }
          if (str1 < str2) {
            return 1;
          }
        }
      return 0;
    });
    tempArray.map(item => {
      item.index = this.arrayIndex++;
      return item;
    });  
    this.sortEvent.emit(tempArray);
    return tempArray;
  }
}
