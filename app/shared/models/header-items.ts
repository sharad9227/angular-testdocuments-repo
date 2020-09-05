export class HeaderData {
	private collectionId: String = '';
	private title: String = 'Unnamed Test';
	private isBack = true;
	private renameTitle = true;
	private totalPoints = 0;
	private totalQuestions = 0;
	private previewButton: String = '';
	private backPage: String = 'list';

	constructor() {}

	public getCollectionId() {
		return this.collectionId;
	}

	public setCollectionId(collectionId) {
		this.collectionId = collectionId;
	}

	public getTitle() {
		return this.title;
	}

	public setTitle(title) {
		this.title = title;
	}

	public getIsBack() {
		return this.isBack;
	}

	public setIsBack(isBack) {
		this.isBack = isBack;
	}

	public getRenameTitle() {
		return this.renameTitle;
	}

	public setRenameTitle(renameTitle) {
		this.renameTitle = renameTitle;
	}

	public getTotalPoints() {
		return this.totalPoints;
	}

	public setTotalPoints(totalPoints) {
		this.totalPoints = totalPoints;
	}

	public getTotalQuestion() {
		return this.totalQuestions;
	}

	public setTotalQuestions(totalQuestions) {
		this.totalQuestions = totalQuestions;
	}

	public getPreviewButton() {
		return this.previewButton;
	}

	public setPreviewButton(previewButton) {
		this.previewButton = previewButton;
	}

	public getBackPage() {
		return this.backPage;
	}

	public setBackPage(backPage) {
		this.backPage = backPage;
	}
}
