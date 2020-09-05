import { Component, OnInit, AfterViewInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { HeaderData } from '../../models/header-items';
import { ShareDataService } from '../../../shared/services/shared.service';
import { Router } from '@angular/router';
import { InputType } from '@mhe/ngx-shared';
import { CommonModalComponent } from '../common.modal/common.modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  public headerName: String;
  public isBack: boolean;
  public title: String;
  public renameTitle: boolean;
  public totalPoints: number;
  public totalQuestions: number;
  public previewButton: String;
  private collectionId: Number;
  public inputType = InputType;

  headerData: HeaderData;

  constructor( private shareDataService: ShareDataService, private router: Router, private _location: Location) { }

  public show = false;
  public buttonName: any = 'Show';
  public alertMessageData: String = '';
  public showHeaderPreferences = true;
  public showConfirmationHeader = false;
  public alertMessage: String = 'You have not saved your changes. Are you sure you want to continue?';
  public modalHeader: String = "Confirmation";
  public size: any = { width: 500 };

  @Input('operationMode') operationMode: String;
  @Input('subRoute') subRoute: String;

  @Input()
  set collection_id(collection_id: Number) {
	  this.collectionId = collection_id;
	  console.log('header collectionId: ' + this.collectionId);
  }
  @Output() settingsRouteActivate = new EventEmitter<any>();

  ngOnInit() {
	  this.headerData = this.shareDataService.getHeaderData();
	  if (this.headerData == null) {
		  this.shareDataService.getCollection().subscribe(data => {
		        this.headerData = data;
		  });
		  if (this.headerData == null) {
			  this.headerData = new HeaderData();
		  }
	  }
	  this.headerName = this.headerData.getTitle();
      this.isBack = this.headerData.getIsBack();
      this.title = this.headerName;
      this.totalPoints = this.headerData.getTotalPoints();
      this.totalQuestions = this.headerData.getTotalQuestion();
      this.previewButton = this.headerData.getPreviewButton();      
  }
  ngAfterViewInit() {}

  modelChanged(event) {
    /** Share data on title change*/
    this.headerData.setTitle(event);
    this.shareDataService.setHeaderData(this.headerData);
    this.shareDataService.setCollection(this.headerData);
    if (event.length > 80) {
      // invalid character, prevent input
      alert('you can not enter more than 80 character');
      event.preventDefault();
    }
  }

  _keyUp(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
  }

  cancel() {
    if (this.operationMode === ('sourceSelect' || 'create') || this.headerName == 'Unnamed Test' || this.subRoute == 'step2') {      
        this.showConfirmationHeader = true;   
    }else{
      this._location.back();
    }
    // this.settingsRouteActivate.emit(this.collection);
  }

  public modalOkJob(){
    if(this.subRoute == 'step2'){
      this.settingsRouteActivate.emit('step1');
    }
    /* Code changes commented will un-comment if user need to navigate to list page from select page*/
    // else if(this.operationMode === 'sourceSelect' && this.subRoute !== 'step2'){
    //   this.router.navigateByUrl('/list');
    // }
    else{
      this._location.back();
    }		
    this.showConfirmationHeader = false;  
	}

	public modalCancelJob(){
		this.showConfirmationHeader = false;
	}
}
