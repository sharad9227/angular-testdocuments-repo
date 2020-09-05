export interface QuestionList {
    'itemInfo': {
        'questions': [
            {
                'ezid': String,
                'qid': String,
                'title': String,
                'type': String,
                'algo': boolean,
                'onlinePreview': String,
                'metadataList': [
                    {
                        'category': String,
                        'tag': String,
                        'categoryId': String
                    }
                ],
                'selected'?: boolean
            }
        ]
    };
}
