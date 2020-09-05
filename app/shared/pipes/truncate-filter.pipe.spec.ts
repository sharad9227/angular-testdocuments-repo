import { TruncatePipe } from './truncate-filter.pipe';

describe( 'TruncatePipe', () => {
    let pipe: TruncatePipe;

    beforeEach( () => {
        pipe = new TruncatePipe;
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return undefined', () => {
        expect(pipe.transform(null, null)).toEqual(undefined);
    });

    it('should return exact word without dots if less than 10 char', () => {
        expect(pipe.transform('sample', ['10', '...'])).toEqual('sample');
    });

    it('should return exact word with dots if more than 10 chars', () => {
        expect(pipe.transform('sample text sample text sample text ', ['10', '...']))
        .toEqual('sample ...');
    });
});
