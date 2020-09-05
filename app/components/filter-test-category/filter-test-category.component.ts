import { Component, OnInit, Input, Output, EventEmitter, NgZone, HostListener, AfterViewInit, Renderer2, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { QuestionList } from '../../shared/models/bank-question-list.model';

@Component({
  selector: 'app-filter-test-category',
  templateUrl: './filter-test-category.component.html',
  styleUrls: ['./filter-test-category.component.scss']
})

export class FilterTestCategoryComponent implements OnInit, AfterViewInit {

  qCheckBoxCount: any = 0;
  selectAllItems = true;
  count: any = 0;
  status = true;
  mainPanelElements: any;
  selectedRow: number;
  mainPanel: any;
  questionPanel: any;
  catInputs: any;
  quesChckbxes: any;
  catCountBxes: any;
  catCheckboxes: any;
  inputQuesCount: any;
  filterJsonObject: any = {questions: [], cats: []};
  firstPanelItems: any;

  @ViewChildren('items') items: QueryList<ElementRef>;
  @ViewChildren('inputCat') inputCats: QueryList<ElementRef>;
  @ViewChildren('qCheckbox') qCheckboxes: QueryList<ElementRef>;
  @ViewChildren('catCount') catCounts: QueryList<ElementRef>;
  @ViewChildren('cCheckbox') cCheckboxes: QueryList<ElementRef>;
  @ViewChildren('mainPanelItem') mainPanelItems: QueryList<ElementRef>;

  @ViewChild('mainPanel') mainPanels: ElementRef;
  @ViewChild('questionPanel') questionPanels: ElementRef;
  @ViewChild('inputQues') inputQues: ElementRef;

  constructor(private elem: ElementRef, private render: Renderer2) { }

  @Input('question-list') questionList: QuestionList;
  @Output() messageEvent = new EventEmitter<any>();
  @Output() filterEvent = new EventEmitter<any>();


  ngAfterViewInit() {
    this.mainPanelElements = this.items;
    this.catInputs = this.inputCats;
    this.quesChckbxes = this.qCheckboxes;
    this.catCountBxes = this.catCounts;
    this.catCheckboxes = this.cCheckboxes;
    this.mainPanel = this.mainPanels;
    this.questionPanel = this.questionPanels;
    this.inputQuesCount = this.inputQues;
    this.firstPanelItems = this.mainPanelItems;
  }

  ngOnInit() { }

  OpenPanel(section, index, currItem, event) {
    this.hideSubFilterPanels();
    if (section == 'question') {
        this.toggleDisplay(this.questionPanel.nativeElement.classList, true);
        event.currentTarget.classList.add('cq-box-white');
    } else if (section == 'category') {
        this.toggleDisplay(currItem.classList, true);
        event.currentTarget.classList.add('cq-box-white');
    } else if ( section == 'mainPanel') {
        this.toggleDisplay(this.mainPanel.nativeElement.classList, true);
    }
  }

  clickCount(event, section, index) {
    if (section == 'question') {
        this.qCheckBoxCount = this.qCheckBoxCount;
        if (event.target.checked) {
            this.qCheckBoxCount = this.qCheckBoxCount + 1;
        } else {
            this.qCheckBoxCount = this.qCheckBoxCount - 1;
        }

        if (this.quesChckbxes.length == this.qCheckBoxCount) {
            this.selectAllItems = false;
        } else {
            this.selectAllItems = true;
        }

    } else if (section == 'category') {
        const counyShowBox: any = this.catCountBxes._results[index].nativeElement;
        const inputCatCount: any = this.catInputs._results[index].nativeElement;

        if (event.target.checked) {
            inputCatCount.value = parseInt(inputCatCount.value, 10)  + 1;
        } else {
            inputCatCount.value = parseInt(inputCatCount.value, 10) - 1;
        }
        counyShowBox.innerHTML = inputCatCount.value;

        const elements: any = this.elem.nativeElement.querySelectorAll('.cCheckbox' + index);
        const selectAll = this.elem.nativeElement.querySelector('#select' + index);
        const deSelectAll = this.elem.nativeElement.querySelector('#deselect' + index);

        if (elements.length == inputCatCount.value) {
            this.toggleShowHide(false, selectAll, deSelectAll);
        } else {
            this.toggleShowHide(true, selectAll, deSelectAll);
        }
    }
  }

  closeFilter(section) {
    if (section == 'mainPanel') {
        this.count = 0;
        this.toggleDisplay(this.mainPanel.nativeElement.classList, false);
        this.catInputs.forEach(element => {
            this.count = parseInt(element.nativeElement.value, 10) + this.count;
        });

        this.count = this.count + parseInt(this.qCheckBoxCount, 10);

        this.messageEvent.emit(this.count);
    }
  }

  selectAll(section, index) {
    this.selectAllItems = false;
    if (section == 'question') {
        this.qCheckBoxCount = 0;
        this.quesChckbxes.forEach(element => {
            element.nativeElement.checked = true;
        });
        this.qCheckBoxCount = this.quesChckbxes.length;
        this.createFilterJsonObject(this.quesChckbxes, 'question', true);
    } else if (section == 'category') {
        const selectAll = this.elem.nativeElement.querySelector('#select' + index);
        const deSelectAll = this.elem.nativeElement.querySelector('#deselect' + index);
        this.toggleShowHide(false, selectAll, deSelectAll);

        const elements = this.elem.nativeElement.querySelectorAll('.cCheckbox' + index);
        const counyShowBox: any = this.elem.nativeElement.querySelector('#catCount' + index);
        const inputCatCount: any = this.elem.nativeElement.querySelector('#inputCat' + index);

        elements.forEach(element => {
            element.checked = true;
        });

        inputCatCount.value = elements.length;
        counyShowBox.innerHTML = elements.length;
        this.createFilterJsonObject(elements, 'category', true);
    }
  }

  deselectAll(section, index) {
    this.selectAllItems = true;
    if (section == 'question') {
        this.qCheckBoxCount = 0;
        this.quesChckbxes.forEach(element => {
            element.nativeElement.checked = false;
        });
        this.createFilterJsonObject(this.quesChckbxes, 'question', false);
    } else if (section == 'category') {
        const selectAll = this.elem.nativeElement.querySelector('#select' + index);
        const deSelectAll = this.elem.nativeElement.querySelector('#deselect' + index);
        this.toggleShowHide(true, selectAll, deSelectAll);

        const elements = this.elem.nativeElement.querySelectorAll('.cCheckbox' + index);
        const counyShowBox: any = this.elem.nativeElement.querySelector('#catCount' + index);
        const inputCatCount: any = this.elem.nativeElement.querySelector('#inputCat' + index);

        elements.forEach(element => {
            element.checked = false;
        });

        inputCatCount.value = 0;
        counyShowBox.innerHTML = inputCatCount.value;
        this.createFilterJsonObject(elements, 'category', false);
    }
  }

  toggleShowHide(showSelectAll, selectAll, deSelectAll) {
    if (showSelectAll) {
        this.render.addClass(selectAll, 'show');
        this.render.removeClass(selectAll, 'hide');
        this.render.addClass(deSelectAll, 'hide');
        this.render.removeClass(deSelectAll, 'show');
    } else {
        this.render.addClass(selectAll, 'hide');
        this.render.removeClass(selectAll, 'show');
        this.render.addClass(deSelectAll, 'show');
        this.render.removeClass(deSelectAll, 'hide');
    }
  }

  hideSubFilterPanels() {
      this.toggleDisplay(this.questionPanel.nativeElement.classList, false);
      this.mainPanelElements.forEach(element => {
          this.toggleDisplay(element.nativeElement.classList, false);
      });

      this.firstPanelItems.forEach(element => {
        element.nativeElement.classList.remove('cq-box-white');
    });
  }

  toggleDisplay(element, show) {
    if (show == true) {
      element.add('show');
      element.remove('hide');
    } else {
        element.add('hide');
        element.remove('show');
        element.remove('cq-box-white');
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
      if (event.target.id != 'openMainPanel') {
          if (this.elem.nativeElement.contains(event.target)) {
              console.log('hi if');
          } else {
              console.log('hi else');
              this.closeFilter('mainPanel');
          }
      }
    }

    createFilterJsonObject(elements, section, selectall) {
        let index: any;
        if (section == 'category') {
            elements.forEach(element => {
                index = this.filterJsonObject.cats.indexOf(element.value);
                if (index < 0 && selectall) {
                    this.filterJsonObject.cats.push(element.value);
                } else if (!selectall) {
                    this.filterJsonObject.cats.splice(index, 1);
                }
            });
        } else if (section == 'question') {
            elements.forEach(element => {
                index = this.filterJsonObject.questions.indexOf(element.nativeElement.value);
                if (index < 0 && selectall) {
                    this.filterJsonObject.questions.push(element.nativeElement.value);
                } else if (!selectall) {
                    this.filterJsonObject.questions.splice(index, 1);
                }
            });
        }

        this.filterEvent.emit(this.filterJsonObject);
        console.log(this.filterJsonObject);
    }

    onFilterChange(event, itemVal: any, section) {
        let index: any;
        if (section == 'category') {
            index = this.filterJsonObject.cats.indexOf(itemVal);
            if (event.currentTarget.checked) {
                if (index < 0) {
                    this.filterJsonObject.cats.push(itemVal);
                }
            } else {
                this.filterJsonObject.cats.splice(index, 1);
            }
        } else if (section == 'question') {
            index = this.filterJsonObject.questions.indexOf(itemVal);
            if (event.currentTarget.checked) {
                if (index < 0) {
                    this.filterJsonObject.questions.push(itemVal);
                }
            } else {
                this.filterJsonObject.questions.splice(index, 1);
            }
        }

        this.filterEvent.emit(this.filterJsonObject);
        console.log(this.filterJsonObject);
    }
}
