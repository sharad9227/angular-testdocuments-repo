import { Component, OnInit, ViewChildren, HostListener,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SelectedBankQuestionsService } from './../../services/selected-bank-questions.service';
import { SourceInfoService } from '../../../shared/services/source-info.service';
import { ShareDataService } from '../../services/shared.service';
import { AutoUnsubscribe } from './../decorator/autoUnsubscribe.decorator'
import { Subscription } from 'rxjs';
import { HeaderData } from '../../models/header-items';
import { ButtonType } from '@mhe/ngx-shared';
import { ButtonPurpose } from '@mhe/ngx-shared';

@Component({
  selector: 'source-picker',
  templateUrl: './source-picker.component.html',
  styleUrls: ['./source-picker.component.scss']
})

// @AutoUnsubscribe(["sourceInfoSubscription","selectedBankSubscription"])

export class SourcePickerComponent implements OnInit {


  private error;
  headerData: HeaderData;
  checkedBank = true;
  selectedBankObj: any;
  combinedBankNQuestionObj: any;
  questionList: any;
  sourceInfoData = [];
  initialEvent = {};
  useSourceSuccess: boolean = false;
  screenHeight: number = null;
  screenWidth: number = null;
  sourcePickerCompHeight: number = null;
  selectedBankSubscription: Subscription;
  sourceInfoSubscription: Subscription;
  viewBankInfoData : any;
  showBankInfo = false;
  bankTitle : any;
  public buttonType = ButtonType;
  public _buttonPurpose = ButtonPurpose;
  panelExpanded:boolean=false;
  constructor(private sourceInfoService: SourceInfoService, private sourceBankQuestion: SelectedBankQuestionsService, private router: Router, private shareDataService: ShareDataService) {
    this.onResize();
  }

  @ViewChildren('mySelectedBank') item;
  @Output() questionFlagSelect =new EventEmitter<boolean>();
  @Output() sourceSuccess = new EventEmitter<boolean>();
  products = [];
  selectedBanks = [];

  OnCheckboxSelect(bank, bankName:String, event, index) {
    this.checkedBank = index;
    this.selectedBankObj = bank;
    this.shareDataService.setBankName(bankName);
  }

  OnBankInfoSelect(show : boolean, bankId : String, bankTitle : String){  
    this.bankTitle = bankTitle;
    if(bankId != undefined){
     this.sourceInfoService.viewBankInfo(bankId).subscribe(data=>{
       this.viewBankInfoData = data;
       console.log(this.viewBankInfoData);
     }, error=>{
       this.error = error;
     });
     this.showBankInfo = show;
    }
  }

  hideBankInfo(show : boolean){
    this.showBankInfo = show;
    this.viewBankInfoData = undefined;
  }

  ngOnInit() {
    this.sourceInfoSubscription = this.sourceInfoService.getSourceInfoCollection().subscribe(data => {
      this.sourceInfoData = data;
    }, error => {
      this.error = error;
    });
    this.headerData = this.shareDataService.getHeaderData();
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.sourcePickerCompHeight = this.screenHeight - 379;
  }

  private getQuestionList() { 
    this.questionFlagSelect.emit(true);     
    this.selectedBankObj = {
      'title': 'Sample question title'
    }
    this.questionList = {
      'itemInfo': {
        'questions': [
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098849677000',
            'title': 'MC Economic questions always deal with',
            'type': 'TF',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098849677000&key=8540afd384c9bbf3f477a9924e745223',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'AAT2',
              'categoryId': '13252698032322782'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': 'LOT2',
              'categoryId': '13252698032317812'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098849134200',
            'title': 'MC The range of topics or issues that fit...',
            'type': 'FB',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098849134200&key=2f1277024335b405fcdf6f51591c0877',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'ST2',
              'categoryId': '1325269803232275265'
            },
            {
              'category': 'AACSB',
              'tag': 'AAT3',
              'categoryId': '13252698032322782'
            },
            {
              'category': 'Learning Objective',
              'tag': 'LOT3',
              'categoryId': '4216545264534625432'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Understanding',
              'categoryId': '13252698032319985'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098847485300',
            'title': 'MC Economics is best defined as the study of',
            'type': 'MC',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098847485300&key=46e788ec51ba3d76f5edbfc7d1185944',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'Economics: Studying Choice in a World of Scarcity',
              'categoryId': '13252698032322767'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          },
          {
            'ezid': '12506098847394700',
            'qid': '12506098848057900',
            'title': 'MC The central concern of economics is',
            'type': 'SA',
            'algo': false,
            'onlinePreview': 'https://ezto-dev.mheducation.com/?todo=preview&tid=12506098847394700&qid=12506098848057900&key=77f92173aa98c5eb750cdb05a411654e',
            'points': '10.00',
            'metadataList': [{
              'category': 'Section',
              'tag': 'ST3',
              'categoryId': '13252698032322759'
            },
            {
              'category': 'AACSB',
              'tag': 'Analytical Skills',
              'categoryId': '13252698032319955'
            },
            {
              'category': 'Bloom\'s',
              'tag': 'Knowledge',
              'categoryId': '13252698032317806'
            },
            {
              'category': 'Learning Objective',
              'tag': '1-1',
              'categoryId': '13252698032317834'
            }
            ]
          }
        ],
        'typesAvailable': [
          'MC', 'TF', 'SA', 'FB'
        ],
        'categories': [
          {
            'name': 'Section',
            'tags': [
              {
                'tagName': 'Economics: Studying Choice in a World of Scarcity',
                'id': '13252698032322767'
              },
              {
                'tagName': 'ST2',
                'id': '1325269803232275265'
              },
              {
                'tagName': 'ST3',
                'id': '13252698032322759'
              }
            ]
          },
          {
            'name': 'AACSB',
            'tags': [
              {
                'tagName': 'Analytical Skills',
                'id': '13252698032322767'
              },
              {
                'tagName': 'AAT2',
                'id': '13252698032322782'
              },
              {
                'tagName': 'AAT3',
                'id': '13252698032322459'
              }
            ]
          },
          {
            'name': 'Bloom\'s',
            'tags': [
              {
                'tagName': 'Knowledge',
                'id': '13252698032317806'
              },
              {
                'tagName': 'Understanding',
                'id': '13252698032319985'
              }
            ]
          },
          {
            'name': 'Learning Objective',
            'tags': [
              {
                'tagName': '1-1',
                'id': '13252698032317834'
              },
              {
                'tagName': 'LOT2',
                'id': '13252698032317812'
              },
              {
                'tagName': 'LOT3',
                'id': '4216545264534625432'
              }
            ]
          }
        ]
      }
    };
    this.combinedBankNQuestionObj = { 'bank': this.selectedBankObj, 'questions': this.questionList };
    this.shareDataService.setBankObject(this.combinedBankNQuestionObj);
    this.useSourceSuccess = false;
    this.sourceSuccess.emit(this.useSourceSuccess);
  }

  selectBank() {

    if (this.selectedBankObj) {
      this.getQuestionList();
    }
  }
}
