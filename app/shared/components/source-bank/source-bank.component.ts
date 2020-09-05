import { Component, OnInit, ViewChildren, HostListener, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { QuestionList } from '../../models/bank-question-list.model';
import { QuestionFilterPipe } from './../../pipes/question-filter.pipe';
import { SourceInfoService } from '../../../shared/services/source-info.service';
import { ShareDataService } from '../../services/shared.service';


@Component({
  selector: 'source-bank',
  templateUrl: './source-bank.component.html',
  styleUrls: ['./source-bank.component.scss']
})
export class SourceBankComponent implements OnInit {

  private error;
  private droppedQuestions = [];
  droppedIndex: number = null;
  checkedQuestion = true;
  sourceInfoData = [];
  title = { 'selected': false };
  initialEvent = {};
  selectedQuestions = [];
  similarQuestionsBothPanel = [];
  selectedQuestionsToMove = [];
  selectAllQuestions = [];
  hasMultiple = false;
  screenHeight: number = null;
  screenWidth: number = null;
  sourcePickerCompHeight: number = null;
  sourcePickerCompHeightBody: number = null;
  direction: number;
  isDesc: any;
  column: any;
  previewUrl: String;
  qIndex: Number;
  closeModalPopUp: Boolean;


  constructor(private sourceInfoService: SourceInfoService, private questionListPipe: QuestionFilterPipe, private shareDataService: ShareDataService, private router: Router, private dragula: DragulaService) {
    this.onResize();
  }

  @Input('question-list') questionList: QuestionList;
  @Input('filters-list') filterList: QuestionList;
  @Input('dropped-questions') droppedQuestionList;
  @Input('transfer-success') transferSuccess;
  @ViewChildren('mySelectedBank') item;
  @Output() enableAdd = new EventEmitter<number>();

  ngOnInit() {
    this.sort('typeDesc');
  }

  OnCheckboxSelect(bank, event) {
    const index = this.selectedQuestions.indexOf(bank);
    const draggableIndex = this.selectedQuestionsToMove.indexOf(bank);
    // To initialize the array once selct all and then unselect one
    // Issue is once select all then unselect one also setting as blank array instead the rest of the values


    // For checkbox select unselect object
    if (event) {
      if (index === -1) {
        this.title.selected = false;
        this.selectedQuestions.push(bank);
        // Set selected question list
        this.shareDataService.setSelectedQuestions(this.selectedQuestions);
      }
    } else {
      if (index !== -1) {
        this.title.selected = false;
        this.selectedQuestions.splice(index, 1);
        // Set selected question list
        this.shareDataService.setSelectedQuestions(this.selectedQuestions);
      }
    }
    this.sendMessage();
  }

  private unSelectAll() {
    this.title.selected = false;
    this.questionList.itemInfo.questions.forEach(item => {
      item.selected = false;
    })
  }

  public trackByEzid(index, item) {
    return item.ezid;
  }
  selectAll(event) {
    const requiredResult = this.questionListPipe.transform(this.questionList.itemInfo.questions, this.filterList, true);
    if (event) {
			this.title = { 'selected': true };			
		} else {
			this.title= { 'selected': false };
		}
    requiredResult.forEach(item => {
      item.selected = event;
      if (item.selected && this.selectedQuestions.indexOf(item) === -1) {
        this.selectedQuestions.push(item);
        // Set selected question list
        this.shareDataService.setSelectedQuestions(this.selectedQuestions);
      } else if (!item.selected) {
        const index = this.selectedQuestions.indexOf(item);
        this.selectedQuestions.splice(index, 1);
        // Set selected question list
        this.shareDataService.setSelectedQuestions(this.selectedQuestions);
      }
    });
    this.sendMessage();
  }

  sendMessage() {
    this.enableAdd.emit(this.selectedQuestions.length);
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    /**set source picker component height */
    this.sourcePickerCompHeight = this.screenHeight - 451;
    this.sourcePickerCompHeightBody = this.screenHeight - 499;
  }

  selectBank() {
    this.router.navigate(['/', 'sourceSelect']);
  }

  private setSelectedRowColor() {
    if (this.shareDataService.getDroppedQuestionId() != undefined) {
      this.shareDataService.getDroppedQuestionId().forEach(item => {
        const position = this.droppedQuestions.indexOf(item);
        if (!this.shareDataService.getDeletedQuestionId()) {
          this.droppedQuestions.push(item);
        }
      });
    }
  }

  // Check and remove the
  removeFromArray(original, rightPanel) {
    this.similarQuestionsBothPanel = original.filter(o1 => rightPanel.some(o2 => o1.qid === o2.qid)).map(function (item) { return item['qid']; });
  }

  ngOnChanges() {
    if (this.droppedQuestionList) {
      this.setSelectedRowColor();
      this.removeFromArray(this.questionList.itemInfo.questions, this.droppedQuestionList);
    }

    if (this.transferSuccess == 'Successfull drop') {
      this.unSelectAll();
      //Clearing bank object after succesfull drop
      this.selectedQuestions = [];
    }
  }

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  public getOnlinePreviewUrl(previewUrl, index) {
    this.previewUrl = previewUrl;
    this.qIndex = index + 1;
    this.closeModalPopUp = true;
  }

  public closeModal(obj) {
    this.closeModalPopUp = !obj;
  }
}
