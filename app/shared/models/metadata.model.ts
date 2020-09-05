export class MetaData {
	private metaDataId: String;
	private metaDataValue: String;

	constructor(metaDataId: String, metaDataValue: String) {
		this.metaDataId = metaDataId;
		this.metaDataValue = metaDataValue;
	}

	public getMetaDataId(): String {
		return this.metaDataId;
	}

	public setMetaDataId(metaDataId: String) {
		this.metaDataId = metaDataId;
	}

	public getMetaDataValue(): String {
		return this.metaDataValue;
	}

	public setMetaDataValue(metaDataValue: String) {
		this.metaDataValue = metaDataValue;
	}
 }
