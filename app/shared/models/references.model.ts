export class References {
	private tid: String;
	private qid: String;
	private algo: boolean;
	private types: String;
	private points: String;
	private pinned: boolean;
	private qTitle: String;
	private isbn: String;
	private bankName: String;


	constructor(tid: String, qid: String, algo: boolean = false, types: String = '', points: String = '10.00', pinned:boolean = false, qTitle: String, isbn: String, bankName: String) {
		this.tid = tid;
		this.qid = qid;
		this.algo = algo;
		this.types = types;
		this.points = points;
		this.pinned = pinned;
		this.qTitle = qTitle;
		this.isbn = isbn;
		this.bankName = bankName;
	}

	public getTid(): String {
		return this.tid;
	}

	public setTid(tid: String) {
		this.tid = tid;
	}

	public getQid(): String {
		return this.qid;
	}

	public setQid(qid: String) {
		this.qid = qid;
	}

	public getAlgo(): boolean {
		return this.algo;
	}

	public setAlgo(algo: boolean) {
		this.algo = algo;
	}

	public getTypes(): String {
		return this.types;
	}
	public setTypes(types: String) {
		this.types = types;
	}

	public getPoints(): String {
		return this.points;
	}

	public setPoints(points: String) {
		this.points = points;
	}

	public getPinned(): boolean {
		return this.pinned;
	}

	public setPinned(pinned: boolean) {
		this.pinned = pinned;
	}

	public getQTitle(): String {
		return this.qTitle;
	}

	public setQtitle(qTitle: String) {
		this.qTitle = qTitle;
	}

	public getIsbn(): String {
		return this.isbn;
	}

	public setIsbn(isbn: String) {
		this.isbn = isbn;
	}

	public getBankName(): String {
		return this.bankName;
	}

	public setBankName(bankName: String) {
		this.bankName = bankName;
	}
}
