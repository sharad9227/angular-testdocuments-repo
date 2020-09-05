import { Component, OnInit, HostListener, ElementRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderData } from '../../models/header-items';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AssessmentCollectionInterface } from '../../models/assessment-collection-interface.model';
import { ShareDataService } from '../../../shared/services/shared.service';
import { ResponseModal } from '../../../shared/models/response.model';
import { ViewAssessmentInfoService } from '../../services/view-assessment-info.service';
import { SaveAssessmentService } from '../../services/save-assessment.service';
import { KebabMenuInterface } from './../../models/kebab-menu-model';
import { PaginatePipe } from './../../pipes/pagination.pipe';
import { Collection } from '../../models/collection.model';
import { MetaData } from '../../models/metadata.model';
import { ButtonType } from '@mhe/ngx-shared';
import { InputType } from '@mhe/ngx-shared';
import { ButtonPurpose } from '@mhe/ngx-shared';
import { CommonModalComponent } from '../common.modal/common.modal.component';

@Component({
  selector: 'kebab-component',
  templateUrl: './kebab.component.html',
  styleUrls: ['./kebab.component.scss']
})
export class KebabComponent implements OnInit {
  constructor(private eRef: ElementRef, private router: Router, private shareDataService: ShareDataService, private viewAssessmentInfoService: ViewAssessmentInfoService,
    public sanitizer: DomSanitizer, private saveAssessmentService: SaveAssessmentService, private renderer: Renderer2, private formBuilder: FormBuilder, private paginate: PaginatePipe) { }

  renameValidationForm: FormGroup;
  submitted = false;
  static collectionId: String;
  private error;
  viewAssessmentData: any;
  headerData: HeaderData = new HeaderData();
  showKebab: boolean;
  isClicked = false;
  listStyle = {};
  alertMessageData: ResponseModal = { 'Message': '', 'collectionId': 0, 'isSuccess': false };
  previewMessageData: ResponseModal = { 'Message': '', 'collectionId': 0, 'isSuccess': false };
  show = false;
  showIframe = false;
  itemsPerPage = 1;
  pageNumber = 0;
  totalPage = 0;
  public modalHeader = "Rename";
  public size = { 'width': 600 };
  public title: String = '';
  public showCopyModal: boolean = false;
  public newCollectionTitle: string = "";
  public showCopyError: boolean = false;
  public copyErrorMsg: string = "";
  public rename: Boolean = false;
  public buttonType = ButtonType;
  public _buttonPurpose = ButtonPurpose;
  public inputType = InputType;
  public previewCheckedArr = [];

  @Input('collection') collection: AssessmentCollectionInterface;
  @Input('kebabMenuItems') kebabMenu: KebabMenuInterface;
  @Input('checked-questions') checkedQuestions;
  @Input('disableDelete') disableDelete = false;
  @Input('message') message;
  @Output() softDelete = new EventEmitter<any>();
  @Output() pinUnpinQuestion = new EventEmitter<any>();
  @Output() refreshList = new EventEmitter<any>();
  @Output() renameCollection = new EventEmitter<any>();

  ngOnInit() {
    this.shareDataService.getMessageData().subscribe(data => {
      this.alertMessageData = data;
    });
    this.renameValidationForm = this.formBuilder.group({
      title: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(80)]]
    });
  }

  ngOnChanges() {
	  if (this.checkedQuestions) {
      this.checkedQuestions = this.checkedQuestions;
	  }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.renameValidationForm.controls;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.showKebab = true;
    } else {
      this.showKebab = false;
    }
  }

  pinUnpinQuestionEvent(element) {
    this.pinUnpinQuestion.emit(this.collection);
  }

  deleteAssessment() {
    if (this.disableDelete) {
      this.softDelete.emit(this.collection);
    } else {
      console.log('in deleteAssessment core');
      KebabComponent.collectionId = this.collection.collection_id;
      const message = {
        'Message': 'Are you sure? Or - this cannot be undone.'
      };
      this.shareDataService.sendMessageData(message);
    }
  }

  closeModal(okCancel) {
    this.alertMessageData.Message = '';
    if (okCancel) {
      this.router.navigate(['/deleteAssessment', KebabComponent.collectionId]);
    }
  }

  editAssessment() {
    this.headerData.setCollectionId(this.collection.collection_id);
    this.headerData.setTitle(this.collection.collection_title);
    this.shareDataService.setHeaderData(this.headerData);
    this.router.navigate(['/editAssessment', 'edit']);
  }

  viewAssessment(status: boolean) {
    this.show = status;
    if (status) {
      this.viewAssessmentInfoService.viewAssessmentList(this.collection.collection_id).subscribe(data => {
        this.viewAssessmentData = data;
        console.log(this.viewAssessmentData);
      }, error => {
        this.error = error;
      });
    }
  }

  showPreview(element) {
    this.showIframe = true;    
    // let found = false;
    // if (this.checkedQuestions !== undefined && this.checkedQuestions.length > 0) {
    //   found = this.checkedQuestions.some(el => {
    //     return el === this.collection;
    //   });
    // } 
    // // else {
    // //   this.checkedQuestions = [];
    // // }
    // if (!found) {
    //   this.checkedQuestions.push(this.collection)
    // }
    console.log('Sanity list : '+ this.checkedQuestions);
    this.previewCheckedArr = [];
    this.previewCheckedArr = [...this.checkedQuestions];
    //Check the selected preview is checked or not
    if(!this.checkedQuestions.includes(this.collection)){
      this.previewCheckedArr.push(this.collection);
    }
    console.log('Dirty list : '+ this.previewCheckedArr);
    this.totalPage = this.checkedQuestions.length;
  }

  closePreviewModal(okPreview) {
    this.previewMessageData.Message = '';
    if (okPreview) {
      this.showIframe = false;
    }
  }

  // pageChanged(event, num) {
  //   this.pageNumber = event;
  // }
  private pageChanged(event, num) {
    this.pageNumber = event.pageIndex;
    const startingIndex = this.pageNumber * this.itemsPerPage;
    const endingIndex = (this.pageNumber * this.itemsPerPage) + this.itemsPerPage;

    let paginateParam = { 'itemsPerPage': this.itemsPerPage, 'currentPage': this.pageNumber };
    this.checkedQuestions = this.paginate.transform(this.checkedQuestions, paginateParam);

  }

  public copyTest() {
    this.saveAssessmentService.getNewCollectionName(this.collection.collection_id).subscribe(data => {
      this.newCollectionTitle = data["collectionTitle"];
      this.showCopyModal = true;
    }, error => {
      this.error = error;
    });
  }

  public cancelCopy() {
    this.showCopyModal = false;
  }

  public confirmCopy() {
    let copyCollection = new Collection(Number(this.collection.collection_id), Date.now(), Intl.DateTimeFormat().resolvedOptions().timeZone);
    const metaDataArr: MetaData[] = new Array();
    metaDataArr.push(new MetaData('title', this.newCollectionTitle));
    copyCollection.setMetaData(metaDataArr);
    this.saveAssessmentService.copyCollection(copyCollection).subscribe(data => {
      if (data["isSuccess"]) {
        this.showCopyModal = false;
        this.refreshList.emit();
      } else {
        this.showErrors(data["Message"]);
      }
    }, error => {
      this.error = error;
      this.showErrors(this.error);
    });
  }

  public showErrors(msg: string = "") {
    const element = this.renderer.selectRootElement('#newCollectionTitle');
    element.focus();
    element.style = 'box-shadow: 0 2px 0 0 red;';
    this.showCopyError = true;
    this.copyErrorMsg = msg;
  }

  public hideErrors() {
    this.showCopyError = false;
    this.copyErrorMsg = "";
    const element = this.renderer.selectRootElement('#newCollectionTitle');
    element.style = 'box-shadow: 0 2px 0 0 #007c91;';
  }

  public renameModal() {
    this.title = this.collection.collection_title || this.collection.title;
    this.rename = !this.rename;
  }
  public clearFilter(){
    this.message = '';
  }
  public modalOkJob() {
    this.submitted = true;
    //stop if character count excluding space doesn't match minimum length
    if (this.renameValidationForm.controls.title.value.trim().length < 3) {
      this.message = "Test name cannot be less than 3 characters";
      return;
    }
    // stop here if form is invalid
    if (this.renameValidationForm.invalid) {
      return;
    }
    let collectionDetails = new Collection(Number(this.collection.collection_id), Date.now(), Intl.DateTimeFormat().resolvedOptions().timeZone);
    const metaDataArr: MetaData[] = new Array();
    metaDataArr.push(new MetaData('title', this.renameValidationForm.controls.title.value));
    collectionDetails.setMetaData(metaDataArr);
    this.saveAssessmentService.saveAssessment(collectionDetails).subscribe(data => {
      if (data["isSuccess"]) {
        this.rename = false;
        this.refreshList.emit();
      } else {
        this.message = data["Message"];
        return;
      }
    }, error => {
      this.message = error;
      return;
    });
  }
  public modalCancelJob() {
    this.rename = false;
  }
}
