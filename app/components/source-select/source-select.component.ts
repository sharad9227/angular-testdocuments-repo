import { Component, OnInit, NgZone, HostListener, AfterViewInit, Renderer2, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { SelectedBankQuestionsService } from './../../shared/services/selected-bank-questions.service';
import { ShareDataService } from '../../shared/services/shared.service';
import { DragulaService } from 'ng2-dragula';
import { BehaviorSubject, Subscription } from 'rxjs';
import { KebabMenuInterface } from './../../shared/models/kebab-menu-model';
import { QuestionFilterPipe } from './../../shared/pipes/question-filter.pipe';
import { Collection } from './../../shared/models/collection.model';
import { References } from '../../shared/models/references.model';
import { MetaData } from '../../shared/models/metadata.model';
import { HeaderData } from './../../shared/models/header-items'
import { FilterTestCategoryComponent } from '../filter-test-category/filter-test-category.component';
import { DndModule } from 'ng2-dnd';
import { ButtonType } from '@mhe/ngx-shared';
import { ButtonPurpose } from '@mhe/ngx-shared';

@Component({
    selector: 'app-source-select',
    templateUrl: './source-select.component.html',
    styleUrls: ['./source-select.component.scss']
})
export class SourceSelectComponent implements OnInit {

    questionList: any;
    questionList1: any;
    bankObj: any;
    ezidObj: any;
    subscribedData: any;
    screenHeight: number;
    screenWidth: number;
    showBank: boolean = true;
    pinnedQuestionList = [];
    pinnedQuestionListIndex = [];
    previewUrl :String;
    qIndex :Number;
    closeModalPopUp :Boolean = false;
    sourcePickerCompHeight: number;
    sourcePickerTableCompHeight: number;
    headerData: HeaderData = new HeaderData();
    collection: Collection;
    operationMode = 'sourceSelect';
    transferSuccessMsg = '';
    collectionId: String = '';
    selectedTitle = { 'selected': false };
    renameActivated = true;
    dragOperation = false;
    draggedArrayLength: number;
    selectedQuestions = { 'select': true };
    kebabMenu: KebabMenuInterface;
    panelExpanded :boolean = false;
    panelClosed:boolean =false;
    public message = 'Are you sure you want to remove this question from your collection?';
    public alertMessage = 'Points should be in between 1 to 99'
    public size = { width: 302 };
    public showModal = false;
    public modalShow = true;
    public buttonType = ButtonType;
    public _buttonPurpose = ButtonPurpose;

    public selectedQuestionsListObj;
    public selectedQuestionsList = [];
    public editQuestionList = [];
    private arrayIndex = 0;
    private questionIdArray = [];
    public hideHeader:boolean=false;
    COPYABLE = 'COPYABLE';
    step: String = 'step1';

    enableAdd = 0;
    count: any = 0;
    filterJsonObject: any = {};

    subs = new Subscription();

    constructor(private elem: ElementRef, private render: Renderer2, private questionListPipe: QuestionFilterPipe, private sourceBankQuestion: SelectedBankQuestionsService, 
        private dragula: DragulaService, private ngZone: NgZone, private shareDataService: ShareDataService) {
        dragula.destroy('SELECTED-QUESTIONS'); // Remove group before creating new
        dragula.createGroup('SELECTED-QUESTIONS', {
            moves: (el, container, handle) => {
                return handle.parentElement.className === 'handles';
            }
        });
        this.dragula.dragend().subscribe(value => {
            // reset all the index value after one/multiple objects inserted in between array
            console.log('Drag end: ' + value);
            this.arrayIndex = 0;
            this.questionIdArray = [];
            this.assignArrayIndex(this.selectedQuestionsListObj);
            this.arrayPinnedQuestions();
        });
    }

    @ViewChild(FilterTestCategoryComponent) child: FilterTestCategoryComponent;

    ngOnInit() {
        this.onResize();
        this.kebabMenu = {
            get_info: false,
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
        
        this.headerData = this.shareDataService.getHeaderData();
        if(this.headerData !== undefined && this.headerData != null) {
        	this.collectionId = this.headerData.getCollectionId();
        }
        this.getEditData();
        this.setCollectionInfoInHeader();
    }






    receiveDataWhileChecked($event) {
        this.enableAdd = $event;
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

        const questionsList = this.selectedQuestionsListObj;
        const isbn = localStorage.getItem('isbn');
        if (questionsList && questionsList.length > 0) {
            const referencesArr: References[] = new Array();
            this.selectedQuestionsListObj.forEach((question) => {
                referencesArr.push(new References(question['ezid'], question['qid'], question['algo'], question['type'], question['points'],  question['pinned'], question['title'], isbn, this.shareDataService.getBankName()));
            });
            this.collection.setReferences(referencesArr);
        }
        this.shareDataService.setCollectionDetails(this.collection);
        this.shareDataService.setCollectionSubject(this.collection);
        return this.collection;
    }

    public setCollectionInfoInHeader() {
		let totalPoints = 0, questionLength = 0;
		if (this.selectedQuestionsListObj) {
			const questionsList = this.selectedQuestionsListObj;
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
    

    public arrayPinnedQuestions() {
        this.pinnedQuestionListIndex = [];
        this.pinnedQuestionList = [];
        this.selectedQuestionsListObj = this.selectedQuestionsListObj.map(item => {
            const index = this.selectedQuestionsListObj.indexOf(item);
            if (item.pinned) {
                this.pinnedQuestionListIndex.push(index);
                this.pinnedQuestionList.push(item);
            }
            return item;
        });
        this.createCollectionObject();
    }

    public assignArrayIndex(data) {
        if(data !== undefined && data != null) {
            const list = [];
            this.selectedQuestionsListObj = data.map(item => {
                item.index = this.arrayIndex++;
                this.questionIdArray.push(item.qid);
                if (list.indexOf(item.qid) === -1) {
                    list.push(item.qid);
                }
                this.shareDataService.setDroppedQuestionId(list);
                return item;
            });
        }
        // Share data to footer component for save and exit
        this.createCollectionObject();
        this.setCollectionInfoInHeader();
    }

    public pointsChanged(event) {
        // reset all the index value after one/multiple objects inserted in between array when input value changed
        this.arrayIndex = 0;
        this.questionIdArray = [];
        this.assignArrayIndex(this.selectedQuestionsListObj);
    }

    transferDataSuccess(event) {

        const idVal = event.mouseEvent.target.id;
        const idIndex = idVal.match(/[0-9]+/g);
        // check to observe new data or selected data is dragged and push it to array
        const firstArrayItem = JSON.parse(JSON.stringify(event.dragData[0] || null));
        const secondArrayItem = JSON.parse(JSON.stringify(event.dragData[1] || null));

        // if (secondArrayItem[0].selected) {
        //     secondArrayItem[0].select = true;
        // }
        firstArrayItem.forEach((item) => {
            // Comparing objects
            if (JSON.stringify(item) === JSON.stringify(secondArrayItem[0])) {
                secondArrayItem.splice(0, 1);
            }
        });
        if (event.dragData[0].length > 0) {
            if (idIndex !== null || undefined) {
                this.selectedQuestionsListObj.splice(idIndex, 0, ...firstArrayItem);
            } else {
                this.selectedQuestionsListObj.push(...firstArrayItem);
            }
        }
        if (secondArrayItem[0]) {
            if (idIndex !== null || undefined) {
                this.selectedQuestionsListObj.splice(idIndex, 0, ...secondArrayItem);
            } else {
                this.selectedQuestionsListObj.push(...secondArrayItem);
            }
        }

        //Set message on successfull drop
        this.transferSuccessMsg = "Successfull drop";
        // reset all the index value after one/multiple objects inserted in between array
        this.arrayIndex = 0;
        this.questionIdArray = [];
        this.assignArrayIndex(this.selectedQuestionsListObj);
        this.arrayPinnedQuestions();
        this.shareDataService.setSelectedQuestionList(this.selectedQuestionsListObj);
    }

    addToRight = function (event) {
        let addQuestionsList = JSON.parse(JSON.stringify(this.shareDataService.getSelectedQuestions()));
        //apply filter if filter is applied
        addQuestionsList = this.questionListPipe.transform(addQuestionsList, this.filterJsonObject, true);

        addQuestionsList.forEach((item) => {
            if (item.selected) {
                //To remove selection while added to right
                item.selected = false;
            }
            item.index = this.arrayIndex++;
        });
        this.selectedQuestionsListObj.push(...addQuestionsList);
        this.enableAdd = 0; // To disable Add button

        //Set message on successfull drop
        this.transferSuccessMsg = "Successfull drop";

        // reset all the index value after one/multiple objects inserted in between array
        this.arrayIndex = 0;
        this.questionIdArray = [];
        this.assignArrayIndex(this.selectedQuestionsListObj);
        this.arrayPinnedQuestions();

        // Clear array after adding to right
        const selectedQuestionArray = []
        this.shareDataService.setSelectedQuestions(selectedQuestionArray);
    };

    OnCheckboxSelect(bank, event) {
        var that = this;
        const index = this.selectedQuestionsList.indexOf(bank);        
        if (event) {
            if (index === -1) {
                that.selectedTitle.selected = false;
                this.selectedQuestionsList.push(bank);
            }
        } else {
            if (index !== -1) {
                that.selectedTitle.selected = false;
                this.selectedQuestionsList.splice(index, 1);
            }
        }

        that.renameActivated = this.selectedQuestionsList.length > 1 ? false : true ;        
    }

    pinUnpinQuestion(obj) {
        if (this.selectedQuestionsListObj[obj.index].pinned != undefined) {
            this.selectedQuestionsListObj[obj.index].pinned = !this.selectedQuestionsListObj[obj.index].pinned;
        }
        this.createCollectionObject();
        this.arrayPinnedQuestions();
    }

    sortOnlyUnpinned(event) {
        if (event != undefined) {
            this.selectedQuestionsListObj = event;
            for(let questions = 0 ; questions < this.selectedQuestionsListObj.length; questions++){
                if (this.selectedQuestionsListObj[questions].pinned) {
                    this.selectedQuestionsListObj.splice(questions, 1);
                    questions--;
                }
            }
            //insert pinned one to designated pre determined position
            for (let pinnedArray = 0; pinnedArray < this.pinnedQuestionListIndex.length; pinnedArray++) {
                this.selectedQuestionsListObj.splice(this.pinnedQuestionListIndex[pinnedArray], 0, this.pinnedQuestionList[pinnedArray])
            }
            // reset all the index value after one/multiple objects inserted in between array
            this.arrayIndex = 0;
            this.questionIdArray = [];
            this.assignArrayIndex(this.selectedQuestionsListObj);
        }
    }

    selectAllSelctedSource(event) {
        var that = this;
        if (event) {
			this.selectedTitle = { 'selected': true };			
		} else {
			this.selectedTitle = { 'selected': false };
		}
        this.selectedQuestionsListObj.forEach(item => {
            item.selected = event;
            if (item.selected && this.selectedQuestionsList.indexOf(item) === -1) {
                this.selectedQuestionsList.push(item);
            } else if (!item.selected) {
                const index = this.selectedQuestionsList.indexOf(item);
                this.selectedQuestionsList.splice(index, 1);
            }            
        });
        that.renameActivated = this.selectedQuestionsList.length > 1 ? false : true ;
    }

    private getEditData() {
        this.getBankDetails();
        if (this.shareDataService.getLandingState() == 'zero-state') {
            this.selectedQuestionsListObj = [];
        }
        if (this.shareDataService.getLandingState() == 'edit-state') {
            if (this.shareDataService.getCollectionObjectDetails() != undefined || this.shareDataService.getCollectionObjectDetails() != null) {
                this.selectedQuestionsListObj = this.shareDataService.getCollectionObjectDetails().references;
            }
        }
        // reset all the index value after one/multiple objects inserted in between array
        this.arrayIndex = 0;
        this.questionIdArray = [];
        this.assignArrayIndex(this.selectedQuestionsListObj);
        this.arrayPinnedQuestions();
        this.createCollectionObject();
    }

    public trackByIndex(index, item) {
        return index;
    }
    checkQuestionLoad(event) {
        this.showBank = event;
    }
    getData() {
        console.log('checking : ', this.questionList);
        this.questionList = 'Example';
    }

    getBankDetails() {
        this.shareDataService.getBankObject().subscribe(
            data => {
                this.bankObj = data;
            },
            error => {
                console.log('in error of getBankDetails : ', error);
            }
        );
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        /**set source picker component height */
        this.sourcePickerCompHeight = this.screenHeight - 371;
        this.sourcePickerTableCompHeight = this.screenHeight - 420;
    }

    OpenPanel(section, index, item, event) {
        this.child.OpenPanel('mainPanel', index, item, event);
    }

    receiveMessage($event) {
        this.count = $event;
    }

    receiveFilter($event) {
        this.filterJsonObject = JSON.parse(JSON.stringify($event));
    }

    modalOptOut($event) {
        this.modalShow = false;
    }

    removeSelected() {
        this.showModal = true;
        if (!this.modalShow) {
            this.modalOkJob();
        }
    }

    softSourceDelete(obj) {
        console.log('in softSourceDelete ', obj);
        // delete from selected question list
        const selectedIndex = this.selectedQuestionsList.indexOf(obj);
        this.selectedQuestionsList.splice(selectedIndex, 1);
        // delete from right hand panel
        this.selectedQuestionsListObj.forEach(item => {
            if (obj == item) {
                const index = this.selectedQuestionsListObj.indexOf(item);
                this.selectedQuestionsListObj.splice(index, 1);
                this.shareDataService.setDeletedQuestionId(item);
                // reset all the index value after one/multiple objects inserted in between array
                this.arrayIndex = 0;
                this.questionIdArray = [];
                this.assignArrayIndex(this.selectedQuestionsListObj);
            }
        });
    }

    public getOnlinePreviewUrl(previewUrl,index){
		this.previewUrl = previewUrl;
		this.qIndex = index + 1;
		this.closeModalPopUp = true;
    }
    public closeModal(obj){
		this.closeModalPopUp = !obj;
	}
    // Remove array of data from right hand panel
    removeFromArray(original, remove) {
        return original.filter(value => !remove.includes(value));
    }
    modalOkJob() {
        this.selectedQuestionsListObj = this.removeFromArray(this.selectedQuestionsListObj, this.selectedQuestionsList);
        this.assignArrayIndex(this.selectedQuestionsListObj);
        this.selectedQuestionsList = [];
        this.showModal = false;
    }
    modalCancelJob() {
        this.showModal = false;
    }
    
    public settingsRouteActivate(){
		if(this.step == 'step2'){
			this.step = 'step1';
		}		
    }
    
    public validatePoints(event: any) {
		let isValid = true;
		const value = event.target.value;
		if (value === undefined || value == "" || value == "0") {
			isValid = false;
		} else if (isNaN(value)) {
        	isValid = false;
        } else {
        	const numVal = parseFloat(value);
    		if (numVal > 2000) {
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
            this.setCollectionInfoInHeader();
        } else {
        	event.target.style = 'box-shadow: 0 2px 0 0 red;';
        	const element = this.render.selectRootElement('#'+event.target.id);
    		element.focus();
    		const message = {'Message' : 'Enter a point value between 0.00 and 1000.00'};
        	this.shareDataService.sendMessageData(message);
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
    
    public setArrayIndex(arrayIndex: number) {
		this.arrayIndex = arrayIndex;
    }
    
    public hideAddQuestion(event) {
        if (event) {
            this.hideHeader=true;
        }
    }
}
