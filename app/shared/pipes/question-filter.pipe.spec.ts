import { QuestionFilterPipe } from './question-filter.pipe';

describe( 'QuestionFilterPipe', () => {
    let pipe: QuestionFilterPipe;

    beforeEach( () => {
        pipe = new QuestionFilterPipe;
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });
});