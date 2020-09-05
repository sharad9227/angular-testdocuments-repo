import { MetaData } from './metadata.model';
import { References } from './references.model';

export class Collection {
	collection_id: Number;
	collection_metaData: MetaData[];
	references: References[];
	modified_date: Number;
	time_zone: String;

	constructor(collection_id: Number, modified_date: Number, time_zone: String) {
		this.collection_id = collection_id;
		this.modified_date = modified_date;
		this.time_zone = time_zone;
	}

	public getcollectionId(): Number {
		return this.collection_id;
	}

	public setcollectionId(collection_id: Number) {
		this.collection_id = collection_id;
	}

	public getMetaData(): MetaData[] {
		return this.collection_metaData;
	}

	public setMetaData(collection_metaData: MetaData[]) {
		this.collection_metaData = collection_metaData;
	}

	public setReferences(references: References[]) {
		this.references = references;
	}

	public getReferences(): References[] {
		return this.references;
	}

	public setModifiedDate(modified_date: Number) {
		this.modified_date = modified_date;
	}
}
