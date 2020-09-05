import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { OutputPreferences } from '../../models/output-preferences.model';
import { ShareDataService } from '../../../shared/services/shared.service';
import { SaveAssessmentService } from '../../../shared/services/save-assessment.service';
import { HeaderTypes } from './../../models/header.model';
import { environment } from '../../../../environments/environment';

import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'print-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss']
})
export class PreferenceComponent implements OnInit {
	private collectionId: Number;
	private error;
	public outputPref = "qtiPackage";
	public questionTypeHeaderDisabled = true;
	public displayQuestionHeaderChecked = false;
	public docxPrefVisible = false;
	public disableBelowHorizontal = false;
	private outputPreferences: OutputPreferences = new OutputPreferences();
	private preferences = [];
	public instructions: String = "Student name:__________";
	public columnPref: String = "oneColumn";
	private noOfColumns : Number = 1;
	public spacePref: String = "narrow";
	public answerBlanks: boolean = false;
	public scramble : boolean = false;
	public scrambleDistractors : boolean = false;
	public algoPref : String = "lockedAlgo";
	public showAlgoPref : boolean = false;
	public noOfVersions : Number = 1;
	public pageNumber : Number = 1;
	public headerType: HeaderTypes[] = [
		{"desc": "TRUE/FALSE - Write 'T' if the statement is true and 'F' if the statement is false.",
		"qType" : "TF"},
		{"desc": "MULTIPLE CHOICE - Choose the one alternative that best completes the statement or answers the question.",
		"qType" : "MC"},
		{"desc": "FILL IN THE BLANK.  Write the word or phrase that best completes each statement or answers the question.",
		"qType": "FB"},
		{"desc": "SHORT ANSWER.  Write the word or phrase that best completes each statement or answers the question.",
		"qType": "SA"},
		{"desc": "CHECK ALL THE APPLY. Choose all options that best completes the statement or answers the question.",
		"qType": "CA"}
	];
	public maxHeaderLength : number = 140;
	public selectedIndex = -1;
	public firstPageHeader : String = "";
	public otherPageHeader : String = "";
	private displayQuestionTypeHeader : String = "TF:TRUE/FALSE,CA:CHECK ALL THAT APPLY,MC:MULTIPLE CHOICE,FB:FILL IN THE BLANKS,SA:SHORT ANSWER";
	public startQuestionNo : Number = 1;
	public tfAlignment : String = "Below-Vertical";
	public mcCaAlignment : String = "Below-Vertical";
	public saAnswerSpace : Number = 3;
	public saPref : String = "lines";
	public firstHeaderCharLeft : number = 140;
	public secondHeaderCharLeft : number = 140;
	public showHeaderPreferences = false;
	public size = { width: 1000 };
	public saveAsDefault : boolean = false;
	private scrambleWithLockedAlgo : boolean = false;
	private scrambleWithUnLockedAlgo : boolean = false;
	private questionSort : boolean = false;
	public answerKeyPage: string = 'continuePageNo';
	public answerKeyPageNo: Number = 1;
	public answerKeyPageNoDisabled: boolean = true;
	public showAnswerBlanks: boolean = false;
	public questionInfo: boolean = false;
	private showQuestionHeader: boolean = false;
	private applyDefault: boolean = false;
	
	public oneColumnImgUrl = environment.assests + '/assets/img/one-column.png';
	public twoColumnImgUrl = environment.assests + '/assets/img/two-column.png';
	public wideSpaceImgUrl = environment.assests + '/assets/img/wide-space.png';
	public narrowSpaceImgUrl = environment.assests + '/assets/img/narrow-space.png';
	public modalHeader = "Set Order";
	public settingsChanged = false;
	public qtiTypesVisible = true;
	private exportTypeValue : String = "canvas";
	
	@Input()
	set collection_id(collection_id: Number) {
		this.collectionId = collection_id;
	}
	
	constructor(private shareDataService: ShareDataService, private dragula: DragulaService, private saveAssessmentService: SaveAssessmentService, private renderer: Renderer2) {
		dragula.destroy('HEADERS'); // Remove group before creating new
		dragula.createGroup('HEADERS', {
			moves: (el, container, handle) => {
				return handle.parentElement.className === 'handles';
			}
		});
	}
	
	ngOnInit() {

		const initialHeader = [
			{"desc": "TRUE/FALSE - Write 'T' if the statement is true and 'F' if the statement is false.",
			"qType" : "TF"},
			{"desc": "MULTIPLE CHOICE - Choose the one alternative that best completes the statement or answers the question.",
			"qType" : "MC"},
			{"desc": "FILL IN THE BLANK.  Write the word or phrase that best completes each statement or answers the question.",
			"qType": "FB"},
			{"desc": "SHORT ANSWER.  Write the word or phrase that best completes each statement or answers the question.",
			"qType": "SA"},
			{"desc": "CHECK ALL THE APPLY. Choose all options that best completes the statement or answers the question.",
			"qType": "CA"}
		];
		
		this.saveAssessmentService.getPreferences(this.collectionId).subscribe(data => {
			this.preferences = data;
			if(this.preferences["userCollectionPreference"] !== undefined) {
				this.buildOutputPreferences(this.preferences["userCollectionPreference"], initialHeader);
			} else if(this.preferences["userDefaultPreference"] !== undefined) {
				this.buildOutputPreferences(this.preferences["userDefaultPreference"], initialHeader);
			}
			
			if(this.preferences["userDefaultPreference"] === undefined) {
				this.preferences["userDefaultPreference"] = this.preferences["userCollectionPreference"];
			}
			
	      }, error => {
	        this.error = error;
	      });
		
		this.shareDataService.setDefaultHeaderOrder(initialHeader);
	}

	public showHeaderOrder() {
		this.showHeaderPreferences = true;
	}

	public editHeader(index, item) {
		this.selectedIndex = index;
	}

	public modalOkJob(){
		this.outputPreferences.setDisplayQuestionTypeHeader(this.headerType);
		this.showHeaderPreferences = false;
	}

	public modalCancelJob(){
		this.headerType = JSON.parse(JSON.stringify(this.shareDataService.getDefaultHeaderOrder()));
		this.showHeaderPreferences = false;
	}

	public sortSelect(event) {
		if (event.target.checked) {
			this.questionTypeHeaderDisabled = false;
			this.outputPreferences.setQuestionTypeSort(true);
		} else {
			this.displayQuestionHeaderChecked = false;
			this.questionTypeHeaderDisabled = true;
			this.outputPreferences.setQuestionTypeSort(false);
			//this.outputPreferences.setDisplayQuestionTypeHeader(null);
			this.showQuestionHeader = false;
			this.outputPreferences.setShowQuestionHeader(this.showQuestionHeader);
		}
		this.shareDataService.setOutputPreferences(this.outputPreferences);
	}

	public outputPrefChange(outputPref: String) {
		if (outputPref == 'document') {
			this.qtiTypesVisible = false;
			this.docxPrefVisible = true;
			this.outputPreferences.setExportType('document');
		} else {
			this.docxPrefVisible = false;
			this.qtiTypesVisible = true;
			this.outputPreferences.setExportType('qtiPackage');
			this.outputPreferences.setQuestionTypeSort(false);
		}
		this.shareDataService.setOutputPreferences(this.outputPreferences);
	}
	
	public countCharacters(event){
		let eventId = event.target.id, 
		eventValue = event.target.value;
		console.log(eventId + "::::" + eventValue);
		if(eventId == 'firstPageHeader') {
			this.firstHeaderCharLeft = this.maxHeaderLength - eventValue.length;
		} else if(eventId == 'otherPageHeader') {
			this.secondHeaderCharLeft = this.maxHeaderLength - eventValue.length;
		}
	}
	
	public prefChanges(event) {
		let eventId = event.target.id, 
			eventValue = event.target.value;
		console.log(eventId + "::::" + eventValue);
		if(eventId == 'instructions') {
			this.instructions = eventValue;
			this.outputPreferences.setInstructions(this.instructions);
		} else if(eventId == 'oneColumn' || eventId == 'twoColumn') {
			this.columnPref = eventValue;
			if(this.columnPref == 'oneColumn') {
				this.noOfColumns = 1;
				this.disableBelowHorizontal = false;
			} else {
				this.noOfColumns = 2;
				this.disableBelowHorizontal = true;
				this.tfAlignment = "Below-Vertical";
				this.mcCaAlignment = "Below-Vertical";
				this.outputPreferences.setTfAlignment(this.tfAlignment);
				this.outputPreferences.setMcCaAlignment(this.mcCaAlignment);
			}
			this.outputPreferences.setLayoutType(this.noOfColumns);
		} else if(eventId == 'wideSpacing' || eventId == 'narrowSpacing') {
			this.spacePref = eventValue;
			this.outputPreferences.setQuestionSpacing(this.spacePref);
		} else if(eventId == 'answerBlanks') {
			if(event.target.checked) {
				this.answerBlanks = true;
				this.showAnswerBlanks = true;
			} else {
				this.answerBlanks = false;
				this.showAnswerBlanks = false;
			}
			this.outputPreferences.setAnswerBlanks(this.answerBlanks);
		} else if(eventId == 'scramble') {
			if(event.target.checked) {
				this.showAlgoPref = true;
				this.scramble = true;
				this.outputPreferences.setScrambleWithLockedAlgo(true);
				this.outputPreferences.setScrambleWithUnLockedAlgo(false);
			} else {
				this.showAlgoPref = false;
				this.scramble = false;
				this.outputPreferences.setScrambleWithLockedAlgo(false);
				this.outputPreferences.setScrambleWithUnLockedAlgo(false);
				this.noOfVersions = 1;
				this.outputPreferences.setNoOfVersion(this.noOfVersions);
			}
		} else if(eventId == 'lockedAlgo' || eventId == 'unlockedAlgo') {
			this.algoPref = eventValue;
			if(eventId == 'lockedAlgo') {
				this.outputPreferences.setScrambleWithLockedAlgo(true);
				this.outputPreferences.setScrambleWithUnLockedAlgo(false);
			} else {
				this.outputPreferences.setScrambleWithLockedAlgo(false);
				this.outputPreferences.setScrambleWithUnLockedAlgo(true);
			}
		} else if(eventId == 'scrambleDistractors') {
			if(event.target.checked) {
				this.outputPreferences.setScrambleDistractors(true);
			} else {
				this.outputPreferences.setScrambleDistractors(false);
			}
		} else if(eventId == 'versions') {
			let isValid = this.validateNumber(event, 20);
			if(isValid) {
				this.noOfVersions = parseInt(eventValue);
			} else {
				event.target.value = 1;
				this.noOfVersions = 1;
			}
			this.outputPreferences.setNoOfVersion(this.noOfVersions);
		} else if(eventId == 'firstPageHeader') {
			this.firstPageHeader = eventValue;
			this.outputPreferences.setFirstPageHeader(this.firstPageHeader);
		} else if(eventId == 'otherPageHeader') {
			this.otherPageHeader = eventValue;
			this.outputPreferences.setOtherPageHeader(this.otherPageHeader);
		} else if(eventId == 'displayQuestionTypeHeader') {
			if(event.target.checked) {
				this.outputPreferences.setDisplayQuestionTypeHeader(this.headerType);
				this.showQuestionHeader = true;
			} else {
				this.showQuestionHeader = false;
			}
			this.outputPreferences.setShowQuestionHeader(this.showQuestionHeader);
		} else if(eventId == 'saAnswerSpace') {
			this.saAnswerSpace = eventValue;
			this.outputPreferences.setSaAlignment(this.saAnswerSpace);
		} else if(eventId == 'tfbelowVertical' || eventId == 'tfbelowHorizontal') {
			this.tfAlignment = eventValue;
			this.outputPreferences.setTfAlignment(this.tfAlignment);
		} else if(eventId == 'mcbelowVertical' || eventId == 'mcbelowHorizontal') {
			this.mcCaAlignment = eventValue;
			this.outputPreferences.setMcCaAlignment(this.mcCaAlignment);
		} else if(eventId == 'saLines' || eventId == 'saBlanks') {
			this.saPref = eventValue;
			this.outputPreferences.setSaBlankAlignment(this.saPref);
		} else if(eventId == 'continuePageNo' || eventId == 'restartPageNo') {
			if(eventId == 'continuePageNo') {
				this.answerKeyPageNoDisabled = true;
				this.outputPreferences.setAnswerKeyStartPageNo(1);
			} else {
				this.answerKeyPageNoDisabled = false;
				this.outputPreferences.setAnswerKeyStartPageNo(this.answerKeyPageNo);
			}
			this.answerKeyPage = eventId;
			this.outputPreferences.setContinueAnswerKeyPageNo(this.answerKeyPage);
		} else if(eventId == 'saveAsDefault') {
			if(event.target.checked) {
				this.saveAsDefault = true;
				if(!this.applyDefault && this.preferences["userDefaultPreference"] !== undefined) {
					this.settingsChanged = true;
				}
			} else {
				this.applyDefault = false;
				this.saveAsDefault = false;
			}
			this.outputPreferences.setSaveAsDefault(this.saveAsDefault);
		} else if(eventId == 'applyDefault') {
			if(event.target.checked) {
				this.applyDefault = true;
				if(this.preferences["userDefaultPreference"] !== undefined) {
					this.buildOutputPreferences(this.preferences["userDefaultPreference"], this.outputPreferences.getDisplayQuestionTypeHeader());
				}
			} else {
				this.applyDefault = false;
				if(this.preferences["userCollectionPreference"] !== undefined) {
					this.buildOutputPreferences(this.preferences["userCollectionPreference"], this.outputPreferences.getDisplayQuestionTypeHeader());
				}
			}
			this.outputPreferences.setApplyDefaultSettings(this.applyDefault);
		} else if(eventId == 'questionInfo') {
			if(event.target.checked) {
				this.questionInfo = true;
			} else {
				this.questionInfo = false;
			}
			this.outputPreferences.setQuestionInfo(this.questionInfo);
		} else if(eventId == 'qtiType') {
				   this.exportTypeValue = eventValue;
					 this.outputPreferences.setExportTypeValue(this.exportTypeValue);
		}
		console.log(this.outputPreferences);
		this.shareDataService.setOutputPreferences(this.outputPreferences);
	}
	
	public validateNumber(event: any, maxRange: Number, minRange: Number = 1) : boolean {
		let isValid = true;
		const eventValue = event.target.value;
		const eventId = event.target.id;
        if (isNaN(eventValue)) {
        	isValid = false;
        } else if(eventValue.indexOf(".") > -1) {
        	isValid = false;
        } else {
        	const numVal = parseInt(eventValue);
    		if (isNaN(numVal) || numVal < minRange) {
    			isValid = false;
    		} else if(maxRange > 0 && numVal > maxRange) {
    			isValid = false;
    		}
        }
        if(isValid) {
        	if(eventId == 'pageNumber') {
				this.pageNumber = parseInt(eventValue);
				this.outputPreferences.setStartPageNo(this.pageNumber);
        	} else if (eventId == 'startQuestionNo') {
    			this.startQuestionNo = parseInt(eventValue);
    			this.outputPreferences.setStartQuestionNo(this.startQuestionNo);
    		} else if (eventId == 'answerKeyPageNo') {
    			if(this.answerKeyPage == 'restartPageNo') {
    				this.answerKeyPageNo = parseInt(eventValue);
        			this.outputPreferences.setAnswerKeyStartPageNo(this.answerKeyPageNo);
    			} else {
        			this.outputPreferences.setAnswerKeyStartPageNo(1);
    			}
    		} 
        	console.log(this.outputPreferences);
    		this.shareDataService.setOutputPreferences(this.outputPreferences);
        } else {
        	if(eventId == 'pageNumber') {
        		const element = this.renderer.selectRootElement('#pageNumber');
        		element.focus();
        	} else if (eventId == 'startQuestionNo') {
        		const element = this.renderer.selectRootElement('#startQuestionNo');
        		element.focus();
        	} else if (eventId == 'answerKeyPageNo') {
        		const element = this.renderer.selectRootElement('#answerKeyPageNo');
        		element.focus();
        	}
        	const message = {'Message' : 'Please enter a positive whole number.'};
        	this.shareDataService.sendMessageData(message);
        }
        return isValid;
	}
	
	private buildOutputPreferences(preferences: any, initialHeader: any) {
		this.setOutputPref(preferences["export_type"] || "qtiPackage");
		this.scrambleWithLockedAlgo = preferences["scramble_with_locked_algo"];
		this.scrambleWithUnLockedAlgo = preferences["scramble_with_unlocked_algo"];
		this.scrambleDistractors = preferences["scramble_distractors"];
        this.noOfVersions = preferences["no_of_version"];
        this.noOfColumns = preferences["layout_type"];
        this.spacePref = preferences["question_spacing"];
		this.pageNumber = preferences["start_page_no"];
		this.questionSort = preferences["question_type_sort"];
		this.saveAsDefault = preferences["save_as_default"];
        this.instructions = preferences["instructions"];
		this.answerBlanks = preferences["answer_blanks"];
        this.startQuestionNo = preferences["start_question_no"];
        this.tfAlignment = preferences["tf_alignment"];
        this.mcCaAlignment = preferences["mc_ca_alignment"];
        this.saAnswerSpace = preferences["sa_alignment"];
        this.saPref = preferences["sa_blank_alignment"];
        this.headerType = preferences["question_header_desc"];
        this.firstPageHeader = preferences["first_page_header"];
        this.otherPageHeader = preferences["other_page_header"];
        this.answerKeyPage = preferences["continue_answer_key_page_no"];
		this.answerKeyPageNo = preferences["start_answer_key_page_no"];
		this.questionInfo = preferences["question_info"];
		this.showQuestionHeader = preferences["show_question_header"];
		this.exportTypeValue = preferences["export_type_value"];
		this.applyDefault = this.saveAsDefault;
        
        this.outputPreferences.setExportType(this.outputPref);
        this.outputPreferences.setScrambleWithLockedAlgo(this.scrambleWithLockedAlgo);
		this.outputPreferences.setScrambleWithUnLockedAlgo(this.scrambleWithUnLockedAlgo);
		this.outputPreferences.setScrambleDistractors(this.scrambleDistractors);
		this.outputPreferences.setNoOfVersion(this.noOfVersions);
		this.outputPreferences.setLayoutType(this.noOfColumns);
		this.outputPreferences.setQuestionSpacing(this.spacePref);
		this.outputPreferences.setStartPageNo(this.pageNumber);
		this.outputPreferences.setQuestionTypeSort(this.questionSort);
		this.outputPreferences.setSaveAsDefault(this.saveAsDefault);
		this.outputPreferences.setInstructions(this.instructions);
		this.outputPreferences.setAnswerBlanks(this.answerBlanks);
		this.outputPreferences.setStartQuestionNo(this.startQuestionNo);
		this.outputPreferences.setTfAlignment(this.tfAlignment);
		this.outputPreferences.setMcCaAlignment(this.mcCaAlignment);
		this.outputPreferences.setSaAlignment(this.saAnswerSpace);
		this.outputPreferences.setSaBlankAlignment(this.saPref);
		this.outputPreferences.setDisplayQuestionTypeHeader(this.headerType);
		this.outputPreferences.setFirstPageHeader(this.firstPageHeader);
		this.outputPreferences.setOtherPageHeader(this.otherPageHeader);
		this.outputPreferences.setContinueAnswerKeyPageNo(this.answerKeyPage);
		this.outputPreferences.setAnswerKeyStartPageNo(this.answerKeyPageNo);
		this.outputPreferences.setQuestionInfo(this.questionInfo);
		this.outputPreferences.setShowQuestionHeader(this.showQuestionHeader);
		this.outputPreferences.setApplyDefaultSettings(this.saveAsDefault);
		this.outputPreferences.setExportTypeValue(this.exportTypeValue);
		console.log(this.outputPreferences);
		
		if(this.outputPref == 'document') {
			this.docxPrefVisible = true;
		}
		if(this.scrambleWithLockedAlgo || this.scrambleWithUnLockedAlgo) {
			this.scramble = true;
			this.showAlgoPref = true;
			if(this.scrambleWithLockedAlgo) {
				this.algoPref = 'lockedAlgo';
			} else {
				this.algoPref = 'unlockedAlgo';
			}
		} else {
			this.showAlgoPref = false;
			this.algoPref = 'lockedAlgo';
			this.scramble = false;
		}
		
		if(this.noOfColumns == 2) {
			this.columnPref = "twoColumn";
		} else {
			this.columnPref = 'oneColumn';
		}
		
		if(this.firstPageHeader === undefined) {
			this.firstPageHeader = '';
		}
		if(this.otherPageHeader === undefined) {
			this.otherPageHeader = '';
		}
		if(this.instructions === undefined) {
			this.instructions = '';
		}
		
		if(this.questionSort) {
			this.questionTypeHeaderDisabled = false;
			this.outputPreferences.setQuestionTypeSort(true);
		}
		
		if(this.headerType !== undefined && this.headerType != null && this.headerType.length > 0) {
			if(this.questionSort && this.showQuestionHeader) {
				this.displayQuestionHeaderChecked = true;
			}
		} else {
			this.headerType = initialHeader;
		}
		
		if(!this.showQuestionHeader) {
			this.displayQuestionHeaderChecked = false;
		}
		
		if(this.answerKeyPage == 'restartPageNo') {
			this.answerKeyPageNoDisabled = false;
		}
		
		if(this.answerBlanks) {
			this.showAnswerBlanks = true;
		}
		
		if(this.outputPreferences.getContinueAnswerKeyPageNo() == 'continuePageNo') {
			this.answerKeyPageNoDisabled = true;
		} else {
			this.answerKeyPageNoDisabled = false;
		}
		this.shareDataService.setOutputPreferences(this.outputPreferences);
	}

	public getOutputPreferences() {
		return this.outputPreferences;
	}

	public setOutputPreferences(outputPreferences: OutputPreferences) {
		this.outputPreferences = outputPreferences;
	}
	
	public cancelSettingsChange() {
		this.settingsChanged = false;
		this.saveAsDefault = false;
		this.outputPreferences.setApplyDefaultSettings(this.applyDefault);
		this.outputPreferences.setSaveAsDefault(this.saveAsDefault);
	}
	
	public confirmSettingsChange() {
		this.settingsChanged = false;
		this.outputPreferences.setApplyDefaultSettings(this.applyDefault);
		this.outputPreferences.setSaveAsDefault(this.saveAsDefault);
	}


	public setOutputPref(outPref : string){
		this.outputPref = outPref;
		if(outPref == "qtiPackage"){
			this.qtiTypesVisible = true;
			this.docxPrefVisible = false;
		} else{
			this.qtiTypesVisible = false;
			this.docxPrefVisible = true;
		}
	}
}
