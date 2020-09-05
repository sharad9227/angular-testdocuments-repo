import { HeaderTypes } from './header.model';
export class OutputPreferences {
	private collection_id: Number;
	private export_type: String = 'qtiPackage';
	private scramble_with_locked_algo = false;
	private scramble_with_unlocked_algo = false;
	private scramble_distractors = false;
	private no_of_version: Number = 1;
	private layout_type: Number = 1;
	private question_spacing: String = 'wide';
	private start_page_no: Number = 1;
	private first_page_header: String;
	private other_page_header: String;
	private instructions: String;
	private question_type_sort = false;
	private question_header_desc: HeaderTypes[];
	private custom_sort_order: String;
	private display_question_no: boolean;
	private start_question_no: Number;
	private tf_alignment: String;
	private mc_ca_alignment: String;
	private sa_alignment: Number;
	private fib_alignment: String;
	private ma_alignment: String;
	private sa_blank_alignment: String;
	private continue_answer_key_page_no: string = 'continuePageNo';
	private start_answer_key_page_no: Number;
	private save_as_default = true;
	private modified_date: Number;
	private time_zone: String;
	private answer_blanks: boolean;
	private question_info: boolean = false;
	private show_question_header: boolean = false;
	private apply_default_settings: boolean = false;
	private save_preference_only: boolean = false;
	private export_type_value : String = "";
	private isbn: String;

	public getCollectionId(): Number {
		return this.collection_id;
	}

	public setCollectionId(collectionId: Number) {
		this.collection_id = collectionId;
	}

	public getExportType(): String {
		return this.export_type;
	}

	public setExportType(exportType: String) {
		this.export_type = exportType;
	}

	public isScrambleWithLockedAlgo(): boolean {
		return this.scramble_with_locked_algo;
	}

	public setScrambleWithLockedAlgo(scrambleWithLockedAlgo: boolean) {
		this.scramble_with_locked_algo = scrambleWithLockedAlgo;
	}

	public isScrambleWithUnLockedAlgo(): boolean {
		return this.scramble_with_unlocked_algo;
	}

	public setScrambleWithUnLockedAlgo(scrambleWithUnLockedAlgo: boolean) {
		this.scramble_with_unlocked_algo = scrambleWithUnLockedAlgo;
	}
	
	public isScrambleDistractors(): boolean {
		return this.scramble_distractors;
	}

	public setScrambleDistractors(scrambleDistractors: boolean) {
		this.scramble_distractors = scrambleDistractors;
	}

	public getNoOfVersion(): Number {
		return this.no_of_version;
	}

	public setNoOfVersion(noOfVersion: Number) {
		this.no_of_version = noOfVersion;
	}

	public getLayoutType(): Number {
		return this.layout_type;
	}

	public setLayoutType(layoutType: Number) {
		this.layout_type = layoutType;
	}

	public getQuestionSpacing(): String {
		return this.question_spacing;
	}

	public setQuestionSpacing(questionSpacing: String) {
		this.question_spacing = questionSpacing;
	}

	public getStartPageNo(): Number {
		return this.start_page_no;
	}

	public setStartPageNo(startPageNo: Number) {
		this.start_page_no = startPageNo;
	}

	public getFirstPageHeader(): String {
		return this.first_page_header;
	}

	public setFirstPageHeader(firstPageHeader: String) {
		this.first_page_header = firstPageHeader;
	}

	public getOtherPageHeader(): String {
		return this.other_page_header;
	}

	public setOtherPageHeader(otherPageHeader: String) {
		this.other_page_header = otherPageHeader;
	}

	public getInstructions(): String {
		return this.instructions;
	}

	public setInstructions(instructions: String) {
		this.instructions = instructions;
	}

	public isQuestionTypeSort(): boolean {
		return this.question_type_sort;
	}

	public setQuestionTypeSort(questionTypeSort: boolean) {
		this.question_type_sort = questionTypeSort;
	}

	public getDisplayQuestionTypeHeader(): HeaderTypes[] {
		return this.question_header_desc;
	}

	public setDisplayQuestionTypeHeader(displayQuestionTypeHeader: HeaderTypes[]) {
		this.question_header_desc = displayQuestionTypeHeader;
	}

	public getCustomSortOrder(): String {
		return this.custom_sort_order;
	}

	public setCustomSortOrder(customSortOrder: String) {
		this.custom_sort_order = customSortOrder;
	}

	public isDisplayQuestionNo(): boolean {
		return this.display_question_no;
	}

	public setDisplayQuestionNo(displayQuestionNo: boolean) {
		this.display_question_no = displayQuestionNo;
	}

	public getStartQuestionNo(): Number {
		return this.start_question_no;
	}

	public setStartQuestionNo(startQuestionNo: Number) {
		this.start_question_no = startQuestionNo;
	}

	public getTfAlignment(): String {
		return this.tf_alignment;
	}

	public setTfAlignment(tfAlignment: String) {
		this.tf_alignment = tfAlignment;
	}

	public getMcCaAlignment(): String {
		return this.mc_ca_alignment;
	}

	public setMcCaAlignment(mcCaAlignment: String) {
		this.mc_ca_alignment = mcCaAlignment;
	}

	public getSaAlignment(): Number {
		return this.sa_alignment;
	}

	public setSaAlignment(saAlignment: Number) {
		this.sa_alignment = saAlignment;
	}

	public getFibAlignment(): String {
		return this.fib_alignment;
	}

	public setFibAlignment(fibAlignment: String) {
		this.fib_alignment = fibAlignment;
	}

	public getMaAlignment(): String {
		return this.ma_alignment;
	}

	public setMaAlignment(maAlignment: String) {
		this.ma_alignment = maAlignment;
	}

	public getContinueAnswerKeyPageNo(): string {
		return this.continue_answer_key_page_no;
	}

	public setContinueAnswerKeyPageNo(continueAnswerKeyPageNo: string) {
		this.continue_answer_key_page_no = continueAnswerKeyPageNo;
	}

	public getAnswerKeyStartPageNo(): Number {
		return this.start_answer_key_page_no;
	}

	public setAnswerKeyStartPageNo(answerKeyStartPageNo: Number) {
		this.start_answer_key_page_no = answerKeyStartPageNo;
	}

	public isSaveAsDefault(): boolean {
		return this.save_as_default;
	}

	public setSaveAsDefault(saveAsDefault: boolean) {
		this.save_as_default = saveAsDefault;
	}

	public getModifiedDate(): Number {
		return this.modified_date;
	}

	public setModifiedDate(modifiedDate: Number) {
		this.modified_date = modifiedDate;
	}

	public getTimeZone(): String {
		return this.time_zone;
	}

	public setTimeZone(timeZone: String) {
		this.time_zone = timeZone;
	}
	
	public isAnswerBlanks(): boolean {
		return this.answer_blanks;
	}

	public setAnswerBlanks(answerBlanks: boolean) {
		this.answer_blanks = answerBlanks;
	}
	
	public setSaBlankAlignment(saBlankAlignment: String) {
		this.sa_blank_alignment = saBlankAlignment;
	}
	
	public getSaBlankAlignment(): String {
		return this.sa_blank_alignment;
	}

	public isQuestionInfo(): boolean {
		return this.question_info;
	}

	public setQuestionInfo(questionInfo: boolean) {
		this.question_info = questionInfo;
	}
	
	public isShowQuestionHeader(): boolean {
		return this.show_question_header;
	}
	
	public setShowQuestionHeader(showQuestionHeader: boolean) {
		this.show_question_header = showQuestionHeader;
	}
	
	public isApplyDefaultSettings(): boolean {
		return this.apply_default_settings;
	}
	
	public setApplyDefaultSettings(applyDefaultSettings: boolean) {
		this.apply_default_settings = applyDefaultSettings;
	}
	
	public isPreferenceSaveOnly(): boolean {
		return this.save_preference_only;
	}
	
	public setPreferenceSaveOnly(preferenceSaveOnly: boolean) {
		this.save_preference_only = preferenceSaveOnly;
	}

	public setExportTypeValue(exportTypeValue: String) {
		this.export_type_value = exportTypeValue;
	}
	
	public getExportTypeValue(): String {
		return this.export_type_value;
	}
	public setIsbn(isbn: String) {
		this.isbn = isbn;
	}
	
	public getIsbn(): String {
		return this.isbn;
	}
}
