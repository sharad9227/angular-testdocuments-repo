import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { ItemsListService } from '../../shared/services/items-list.service';
import { ShareDataService } from '../../shared/services/shared.service';
import { SaveAssessmentService } from '../../shared/services/save-assessment.service';
import { ButtonType } from '@mhe/ngx-shared';
import { ButtonPurpose } from '@mhe/ngx-shared';
import { HeaderData } from '../../shared/models/header-items';
import { Collection } from '../../shared/models/collection.model';
import { MetaData } from '../../shared/models/metadata.model';
import { References } from '../../shared/models/references.model';
import { KebabMenuInterface } from '../../shared/models/kebab-menu-model';
import { EditListInterface } from '../../shared/models/edit-assessment-list.model';
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from './../../shared/components/decorator/autoUnsubscribe.decorator'

@Component({
  selector: 'edit-assessment',
  templateUrl: './edit-assessment.component.html',
  styleUrls: ['./edit-assessment.component.scss']
})
// @AutoUnsubscribe(["saveAssessementSubscription","itemsListServiceSubscription"])
export class EditAssessmentComponent implements OnInit, AfterViewInit {

	collectionId: String = '';
  	private error;
	private message;
	public screenHeight;
	public screenWidth;
	public previewUrl :String;
	public closeModalPopUp = false;
	public qIndex;
	public zeroStateCompHeight;
	public editCompHeight;
	public itemsList = [];
	public selectedQuestionsList = [];
	public operationMode = 'create';
	public headerData: HeaderData;
	public step: String = 'step1';
	private collection: Collection;
	public type: String;
	public saveAssessementSubscription: Subscription;
	public itemsListServiceSubscription: Subscription;
	selectAll = { 'selected': false };
	public buttonType = ButtonType;
  	public _buttonPurpose = ButtonPurpose;
	public alertMessage = "Are you sure you want to remove this question from your collection?";
	public size = { width: 302 };
	public removeReqQuestion = [];
	public modalShow = true;
	public showModal = false;

	private arrayIndex = 0;
	private questionIdArray = [];
	private pinnedQuestionListIndex = [];
	private pinnedQuestionList = [];

	constructor(private saveAssessmentService: SaveAssessmentService, private itemsListService: ItemsListService, private shareDataService: ShareDataService,
		  private router: Router, private route: ActivatedRoute, private dragula: DragulaService, private renderer: Renderer2) {
			dragula.destroy('EDIT-QUESTIONS'); // Remove group before creating new
			dragula.createGroup('EDIT-QUESTIONS', {
				moves: (el, container, handle) => {
					return handle.parentElement.className === 'handles';
				}
			});
			this.dragula.dragend().subscribe(value => {
				this.arrayIndex = 0;
        		this.questionIdArray = [];
				this.assignArrayIndex(this.itemsList['references']);
				this.arrayPinnedQuestions();
			});
		  }

	@ViewChild('globalHeader')
	globalHeader: ElementRef;
	@ViewChild('sourceContainer')
	sourceContainer: ElementRef;
	kebabMenu: KebabMenuInterface;

	ngAfterViewInit() {}

	ngOnInit() {
		this.operationMode = this.route.snapshot.paramMap.get('operationMode');

		if (this.operationMode && this.operationMode == 'edit') {
			this.headerData = this.shareDataService.getHeaderData();
			this.collectionId = this.headerData.getCollectionId();
	    	this.operationMode = 'edit';
	    	this.itemsListServiceSubscription = this.itemsListService.getCollectionItems(this.collectionId).subscribe(data => {
				this.itemsList = data;
				//Assign index
				this.arrayIndex = 0;
        		this.questionIdArray = [];
				this.assignArrayIndex(this.itemsList['references']);
				this.arrayPinnedQuestions();
				this.shareDataService.setCollectionObjectDetails(data);
	        	this.setCollectionInfoInHeader();
	        	this.createCollectionObject();
	        });
	    } else {
	    	  this.shareDataService.setHeaderData(null);

	    	  this.createCollectionObject();

		      this.saveAssessementSubscription = this.saveAssessmentService.saveAssessment(this.collection).subscribe(data => {
		        this.collectionId = data.collectionId;
		        this.message = data.Message;
		        this.createCollectionObject();
		      }, error => {
		        this.error = error;
		      });
			}
		this.onResize();

        this.kebabMenu = {
            get_info: true,
			preview: true,
			pinUnpin: true,
            edit: true,
            copy: true,
            rename: false,
            print: false,
            delete: false,
      		remove: true,
        };

		this.shareDataService.getCurrentStep().subscribe(stepName => {
	    	this.step = stepName;
	  });
	}

	@HostListener('window:resize', ['$event']) onResize(event?) {
	    this.screenHeight = window.innerHeight;
	    this.screenWidth = window.innerWidth;
	    /**set source picker component height */
		this.zeroStateCompHeight = this.screenHeight - 292;
		this.editCompHeight = this.screenHeight - 374;
	}

	public assignArrayIndex(data) {
        const list = [];
        this.itemsList['references'] = data.map(item => {
			item.index = this.arrayIndex++;			
			return item;
        });
        // Share data to footer component for save and exit
        this.createCollectionObject();
	}
	
	public selectAllQuestions(event) {
		if (event) {
			this.selectAll = { 'selected': true };			
		} else {
			this.selectAll = { 'selected': false };
			this.selectedQuestionsList = [];
		}
		//check uncheck all on basis of select all
		this.itemsList['references'].forEach( item => {
			if(event){
				item.selected = true;
				this.selectedQuestionsList.push(item);
			}else{
				item.selected = false;
			}			
		})
		//to trigger ng on change on input
		// this.selectedQuestionsList = [...this.selectedQuestionsList];
		this.selectedQuestionsList = this.selectedQuestionsList.slice();
	}

	public setCollectionInfoInHeader() {
		let totalPoints = 0, questionLength = 0;
		if (this.itemsList) {
			const questionsList = this.itemsList['references'];
			if (questionsList && questionsList.length > 0) {
				let totalPoints = 0;
				for (const question of questionsList) {
					totalPoints += +question.points;
				}
				this.headerData.setTotalPoints(totalPoints);
				this.headerData.setTotalQuestions(questionsList.length);
				this.shareDataService.setHeaderData(this.headerData);
			}else{
				this.headerData.setTotalPoints(totalPoints);
				this.headerData.setTotalQuestions(questionLength);
				this.shareDataService.setHeaderData(this.headerData);
			}
			return this.headerData;
		}
	}

	public getOnlinePreviewUrl(previewUrl, type, index){
		this.previewUrl = previewUrl;
		this.qIndex = index + 1;
		this.type = type;
		this.closeModalPopUp = true;
	}
	public closeModal(obj){
		this.closeModalPopUp = !obj;
	}
	public updateModel = function(question) {
		this.createCollectionObject();
	};

	deleteAndUpdateQuestion(){
		//remove index from question list the one we get from kebab
		this.itemsList['references'].splice(this.removeReqQuestion['index'], 1);
		// reset all the index value after one/multiple objects inserted in between array
		this.arrayIndex = 0;
		this.questionIdArray = [];
		this.assignArrayIndex(this.itemsList['references']);
		//set header information
		this.setCollectionInfoInHeader();
	}
	modalOptOut($event) {
        this.modalShow = false;
	}
	softSourceDelete(obj){
		this.removeReqQuestion = obj;		
		this.showModal = true;
		if(!this.modalShow){
			this.deleteAndUpdateQuestion();
		}
	}
	modalOkJob() {
		this.showModal = false;
		this.deleteAndUpdateQuestion();	
	}
	modalCancelJob(){
		this.showModal = false;
	}
	public createCollectionObject() {
		this.collection = new Collection(Number(this.collectionId) || 0, Date.now(), Intl.DateTimeFormat().resolvedOptions().timeZone);

		const metaDataArr: MetaData[] = new Array();
		if (this.headerData) {
			metaDataArr.push(new MetaData('title', this.headerData.getTitle()));
		} else {
			metaDataArr.push(new MetaData('title', 'Unnamed Test'));
		}
		this.collection.setMetaData(metaDataArr);

		const questionsList = this.itemsList['references'];
		const isbn = localStorage.getItem('isbn');
		if (questionsList && questionsList.length > 0) {
			const referencesArr: References[] = new Array();
			this.itemsList['references'].forEach((question) => {
				referencesArr.push(new References(question['ezid'], question['qid'], question['algo'], question['type'], question['points'],  question['pinned'], question['title'], isbn, this.shareDataService.getBankName()));
			});
			this.collection.setReferences(referencesArr);
		}
		this.shareDataService.setCollectionDetails(this.collection);
		this.shareDataService.setCollectionSubject(this.collection);
		return this.collection;
	}

	public validatePoints(event: any) {
		let isValid = true;
		const value = event.target.value;
		if (value === undefined || value == "") {
			isValid = false;
		} else if (isNaN(value)) {
        	isValid = false;
        } else {
        	const numVal = parseFloat(value);
    		if (numVal > 1000) {
    			isValid = false;
    		} else if (numVal < 0) {
    			isValid = false;
    		} else {
    			const dotPos = value.indexOf(".");
    			if(dotPos > -1 && value.substring(dotPos+1, value.length).length > 2) {
    				isValid = false;
    			}
    		}
        }
        if (isValid) {
			event.target.style = 'box-shadow: 0 2px 0 0 #007c91;';
			//set header information
			this.setCollectionInfoInHeader();
        } else {
        	event.target.style = 'box-shadow: 0 2px 0 0 red;';
        	const element = this.renderer.selectRootElement('#'+event.target.id);
    		element.focus();
    		const message = {'Message' : 'Enter a point value between 0.00 and 1000.00'};
        	this.shareDataService.sendMessageData(message);
		}
		return isValid;
	}

	public addEditQuestions() {
		this.headerData = this.shareDataService.getHeaderData();
		if (this.headerData === undefined || this.headerData == null) {
			this.headerData = new HeaderData();
			this.headerData.setCollectionId(this.collectionId);
		}
		this.headerData.setBackPage('editAssessment');
		this.shareDataService.setHeaderData(this.headerData);
		this.shareDataService.setLandingState('edit-state');
		this.router.navigate(['/sourceSelect'] );
	}

	public OnCheckboxSelect(bank, event) {
        const index = this.selectedQuestionsList.indexOf(bank);
        if (event) {
            if (index === -1) {
                this.selectAll.selected = false;
                this.selectedQuestionsList.push(bank);
            }
        } else {
            if (index !== -1) {
                this.selectAll.selected = false;
                this.selectedQuestionsList.splice(index, 1);
            }
		}
		// this.selectedQuestionsList = [...this.selectedQuestionsList];
		//to trigger ng on change on input
		// this.selectedQuestionsList = [...this.selectedQuestionsList];
		this.selectedQuestionsList = this.selectedQuestionsList.slice();
	}
	
	public addZeroQuestions() {
		this.headerData = this.shareDataService.getHeaderData();
		if (this.headerData === undefined || this.headerData == null) {
			this.headerData = new HeaderData();
			this.headerData.setCollectionId(this.collectionId);
		}
		this.headerData.setBackPage('editAssessment');
		this.shareDataService.setHeaderData(this.headerData);
		this.shareDataService.setLandingState('zero-state');
		this.router.navigate(['/sourceSelect'] );
	}

	public settingsRouteActivate(){
		if(this.itemsList['references']){
			this.step = 'step1';
		}		
	}

	//Pin Feature
	public arrayPinnedQuestions() {
        this.pinnedQuestionListIndex = [];
        this.pinnedQuestionList = [];
        this.itemsList['references'] = this.itemsList['references'].map(item => {
            const index = this.itemsList['references'].indexOf(item);
            if (item.pinned) {
                this.pinnedQuestionListIndex.push(index);
                this.pinnedQuestionList.push(item);
            }
            return item;
		});
		this.createCollectionObject();
    }

	public pinUnpinQuestion(obj) {
        if (this.itemsList['references'][obj.index].pinned != undefined) {
            this.itemsList['references'][obj.index].pinned = !this.itemsList['references'][obj.index].pinned;
		}
		this.arrayPinnedQuestions();
	}
	
	sortOnlyUnpinned(event) {
        if (event != undefined) {
            this.itemsList['references'] = event;
            for(let questions = 0 ; questions < this.itemsList['references'].length; questions++){
                if (this.itemsList['references'][questions].pinned) {
                    this.itemsList['references'].splice(questions, 1);
                    questions--;
                }
			}			
            //insert pinned one to designated pre determined position
            for (let pinnedArray = 0; pinnedArray < this.pinnedQuestionListIndex.length; pinnedArray++) {
                this.itemsList['references'].splice(this.pinnedQuestionListIndex[pinnedArray], 0, this.pinnedQuestionList[pinnedArray])
            }
            // reset all the index value after one/multiple objects inserted in between array
            this.arrayIndex = 0;
            this.questionIdArray = [];
            this.assignArrayIndex(this.itemsList['references']);
        }
    }
	
	public sortedQuestionsList() {
		if(this.selectedQuestionsList.length > 0) {
	        this.selectedQuestionsList.sort(function(question1, question2) {
	            return question1.index - question2.index;
			});
	        return this.selectedQuestionsList;
		}
	}

	public getPinnedQuestionList() {
		return this.pinnedQuestionList;
	}

	public getItemsList() {
		return this.itemsList;
	}

	public setArrayIndex(arrayIndex: number) {
		this.arrayIndex = arrayIndex;
	}
}
