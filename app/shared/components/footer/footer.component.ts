import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../../../shared/services/shared.service';
import { SaveAssessmentService } from '../../services/save-assessment.service';
import { Collection } from '../../models/collection.model';
import { MetaData } from '../../models/metadata.model';
import { References } from '../../models/references.model';
import { ResponseModal } from '../../../shared/models/response.model';
import { HeaderData } from '../../models/header-items';
import { OutputPreferences } from '../../models/output-preferences.model';
import { ButtonType } from '@mhe/ngx-shared';
import { ButtonPurpose } from '@mhe/ngx-shared';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  headerData: HeaderData;
  collection: Collection;
  messageResponse: Object = '';
  error: String = '';
  alertMessageData: ResponseModal = { 'Message' : '', 'collectionId': 0 , 'isSuccess' : false};
  confirmMessageData: ResponseModal = { 'Message' : '', 'collectionId': 0 , 'isSuccess' : false};
  exit = false;
  alertModalShow = false;
  showModal = false;
  public alertMessage = 'Points should be in between 0 to 99';
  public showPointsAlert = false;
  private collectionId: Number;
  private routePath: String = '';
  public step: String = 'step1';
  private outputPreferences: OutputPreferences = new OutputPreferences;
  private continueEnable = false;
  private selectedQuestions: any;
  public buttonType = ButtonType;
  public _buttonPurpose = ButtonPurpose;
  public showEmailModal: boolean = false;
  public emailIdDisabled: boolean = true;
  public showEmailError: boolean = false;
  public userEmailId: String = '';
  public sendMail: boolean = true;

  @Input('operationMode') operationMode: String;

  @Input()
  set collection_id(collection_id: Number) {
	  this.collectionId = collection_id;
  }

  @Input()
  set currentStep(currentStep: String) {
	  console.log(currentStep);
	  this.step = currentStep;
  }

  constructor(private router: Router, private shareDataService: ShareDataService, private saveAssessmentService: SaveAssessmentService) { }

  @ViewChild('alertModal') myDiv: ElementRef;
  ngOnInit() {
	  this.shareDataService.getConfirmMessageData().subscribe(data => {
	    	this.confirmMessageData = data;
	  });

	  this.shareDataService.getMessageData().subscribe(data => {
	    	this.alertMessageData = data;
	  });

	  this.getHeaderData();

	  this.shareDataService.getCurrentStep().subscribe(stepName => {
	    	this.step = stepName;
	  });

	  this.shareDataService.getOutputPreferences().subscribe(outputPreferences => {
	    	this.outputPreferences = outputPreferences;
	  });

	  this.shareDataService.getCollectionSubject().subscribe(data => {
	        this.collection = data;
	        if (this.collection && this.collection['references'] && this.collection['references'].length > 0) {
	  		  	this.continueEnable = true;
	  	  	}else if(this.collection && !this.collection['references']){
				this.continueEnable = false;
				}
	  });

	  if (!this.continueEnable && this.headerData && this.headerData.getTotalQuestion() > 0) {
		  this.continueEnable = true;
	  }
  }

  private getHeaderData() {
	  this.shareDataService.getCollection().subscribe(data => {
	        this.headerData = data;
	        this.headerData.setTitle(data.title.trim());
	  });

	  if (this.headerData === undefined || this.headerData == null) {
		  this.headerData = this.shareDataService.getHeaderData();
	  }

	  if (this.headerData === undefined || this.headerData == null) {
		  if (this.operationMode == 'create') {
			  this.headerData = new HeaderData();
		  } else {
			  this.headerData = this.shareDataService.getHeaderData();
		  }
	  }
  }

  private getCollectionId() {
	  if ((this.collectionId === undefined || this.collectionId == null || this.collectionId <= 0) &&
			  (this.headerData != null && this.headerData.getCollectionId() != '')) {
		  this.collectionId = Number(this.headerData.getCollectionId());
	  }
	  return this.collectionId;
  }

  private validateTitle() {
	const title = this.headerData.getTitle();
	const titleLength = this.headerData.getTitle().trim().length;
	if (titleLength <= 80 && titleLength >= 3 && title != 'Unnamed Test') {
  		return true;
  	} else {
  		const message = {'Message' : 'Please provide a valid test name.'};
  		if (titleLength < 1 || title == 'Unnamed Test') {
  			this.shareDataService.sendMessageData(message);
  	  	} else if (titleLength < 3) {
  	  		message.Message = 'Test name cannot be less than 3 character(s)';
  	  		this.shareDataService.sendMessageData(message);
  	  	} else if (titleLength >= 80) {
  	  		message.Message = 'Test name cannot be more than 80 characters';
	  		this.shareDataService.sendMessageData(message);
  	  	}
  		return false;
  	}
  }

  private prepareCollectionDetails() {
	this.showPointsAlert = false;
	  if (this.collection === undefined || this.collection == null) {
		  this.collection = this.shareDataService.getCollectionDetails();
	  }
	  if (this.collection && this.collection != null) {
		  this.collection.setModifiedDate(Date.now());
	  	  // updating title in case it is changed
	  	  const metaDataArr: MetaData[] = this.collection.getMetaData();
	  	  if (metaDataArr && metaDataArr.length > 0) {
	  		  if (metaDataArr.length == 1 && metaDataArr[0].getMetaDataId() == 'title') {
	  			  if (this.headerData.getTitle() != metaDataArr[0].getMetaDataValue()) {
	  				  metaDataArr[0].setMetaDataValue(this.headerData.getTitle());
						  this.collection.setMetaData(metaDataArr);
					  }
	  		  } else {
	  			  metaDataArr.forEach((metaData) => {
	  				  if (metaData.getMetaDataId() == 'title') {
	  					  if (this.headerData.getTitle() != metaData.getMetaDataValue()) {
	  						  metaData.setMetaDataValue(this.headerData.getTitle());
	  						  this.collection.setMetaData(metaDataArr);
	  					  }
	  					  return;
	  				  }
	  			  });
	  		  }
	  	  }

	  	  const references: References[] = [];
	  	  if (this.collection.getReferences() != undefined && this.collection.getReferences().length > 0) {
			this.collection.getReferences().forEach((question) => {
					if(Number(question.getPoints()) > 99 || Number(question.getPoints()) < 1){
						this.showPointsAlert = true;
						return ;
					}
	  			  references.push(new References(question.getTid(), question.getQid(), question.getAlgo(), question.getTypes(), question.getPoints(), question.getPinned(), question.getQTitle(), question.getIsbn(), question.getBankName()));
	  		  });
			}
	  }
  }

  public cancel() {
	  if (this.operationMode == 'create' || (this.headerData  && this.headerData.getTitle() == 'Unnamed Test')) {
		  const message = {
				  'Message' : 'You have not saved your changes. Are you sure you want to continue?'
		  };
		  this.shareDataService.sendConfirmMessageData(message);
	  } else {
		  this.router.navigate(['/list'] );
	  }
  }

  public closeConfirmModal(okCancel) {
	  this.confirmMessageData.Message = '';
	  if (okCancel) {
		  if (this.operationMode === undefined || this.operationMode == 'create') {
			  this.router.navigate(['/deleteAssessment', this.getCollectionId()] );
		  } else {
			  this.router.navigate(['/list'] );
		  }
	  }
  }

  public closeModal() {
	  this.alertMessageData.Message = '';
	  if (this.exit) {
		  this.router.navigate([this.routePath] );
	  }
  }

  public closeAlertModal(){
	  this.alertModalShow = false;
  }
  
  public resetSaveFlag () {
	  if (this.step == 'step2' && this.outputPreferences !== undefined) {
		  this.outputPreferences.setPreferenceSaveOnly(false);
	  }
  }

  public saveAndExit() {
	  if (this.step == 'step2') {
		  this.outputPreferences.setPreferenceSaveOnly(true);
		  this.submit();
	  } else {
		  this.exit = false;
		  if (this.validateTitle()) {
			  this.prepareCollectionDetails();
			if(this.showPointsAlert){
				this.alertModalShow = true;
			}else{
				this.saveAssessmentService.saveAssessment(this.collection).subscribe(response => {
					this.operationMode = 'edit';
					this.messageResponse = response;
					if (response.isSuccess) {
						this.exit = true;
						this.routePath = '/list';
						this.collectionId = response.collectionId;
						this.headerData.setCollectionId(this.collectionId);
						this.shareDataService.setHeaderData(this.headerData);
					}
					this.shareDataService.sendMessageData(this.messageResponse);
			    }, error => {
			    	this.error = error;
			    });
			}	      
		  }
	  }
  }

  public saveAndContinue() {
	  this.exit = false;
	  if (this.validateTitle()) {
		  this.prepareCollectionDetails();

	      this.saveAssessmentService.saveAssessment(this.collection).subscribe(response => {
	    	if (response && response.isSuccess) {
                this.exit = true;
                this.collectionId = response.collectionId;

                this.headerData.setCollectionId(this.collectionId);
                this.shareDataService.setHeaderData(this.headerData);
                if (this.step == 'step1') {
                	this.shareDataService.setCurrentStep('step2');
                }
	    	} else {
            	this.shareDataService.sendMessageData(response);
            }
	      }, error => {
	        this.error = error;
	      });
	  }
  }

  public submit() {
	  if (this.validateTitle()) {
		this.outputPreferences.setCollectionId(this.collectionId);
		this.outputPreferences.setIsbn(localStorage.getItem('isbn'));
		this.saveAssessmentService.saveAssessmentPreferences(this.outputPreferences).subscribe(response => {
			if (response && response.isSuccess) {
				this.showEmailError = false;
				this.userEmailId = response["userEmailId"];
				this.sendMail = true;
				this.emailIdDisabled = false;
				this.showEmailModal = true;
			}
		}, error => {
			this.error = error;
			this.shareDataService.sendMessageData(error);
		});
	  }
  }
  
  public sendMailPref(event) {
	  if(event.target.checked) {
		  this.emailIdDisabled = false;
	  } else {
		  this.emailIdDisabled = true;
	  }
  }
  
  public validateEmail(mailId) {
	  const mailformat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	  if(mailId !==  undefined && mailId != null && mailId != "" && mailId.match(mailformat)) {
		  this.showEmailError = false;
		  return true;
	  } else {
		  this.showEmailError = true;
		  return false;
	  }
  }
  
  public cancelEmail() {
	  this.showEmailModal = false;
	  this.router.navigate(['/list']);
  }
  
  public confirmEmail() {
	  let isValidEmail = true;
	  if(this.sendMail) {
		  isValidEmail = this.validateEmail(this.userEmailId);
		  if(isValidEmail) {
			  this.saveAssessmentService.saveUserEmailId(this.collectionId, this.userEmailId).subscribe(response => {
				  if (response && response.isSuccess) {
					  this.showEmailModal = false;
					  this.router.navigate(['/list']);
				  }
			  }, error => {
				  this.error = error;
				  this.shareDataService.sendMessageData(error);
			  });
		  }
	  }
  }
}
