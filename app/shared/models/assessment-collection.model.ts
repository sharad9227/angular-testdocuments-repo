import { HeaderData } from './header-items';

export class AssessmentCollection {
    constructor(
        collection_id: String,
        modified_date: Number,
        time_zone: String,
        collection_metaData: [
            {metaDataId: String, metaDataValue: String}
        ],
        references: [
            { tid: String, qid: String }
        ]
    ) {}
}
