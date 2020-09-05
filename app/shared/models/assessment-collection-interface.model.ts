export interface AssessmentCollectionInterface {
        collection_id: String;
        collection_title: String;
        modified_date: String;
        title? :String;
        collection_metaData: [
            {metaDataId: String, metaDataValue: String}
        ];
        references: [
            { tid: String, qid: String }
        ];
}
