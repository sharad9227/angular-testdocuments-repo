import { LinebreakPipe } from './line-break.pipe';

describe( 'LinebreakPipe', () => {
    let pipe: LinebreakPipe;

    beforeEach( () => {
        pipe = new LinebreakPipe;
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return undefined', () => {
        expect(pipe.transform(null, null)).toEqual(undefined);
    });

    it('should return exact word if less than 36 char', () => {
        expect(pipe.transform('sample text', [])).toEqual('sample text');
    });

    it('should return exact word with <br> if more than 36 chars', () => {
        expect(pipe.transform('sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text sample text', []))
        .toEqual('sample text sample text sample text <br>sample text sample text sample text <br>sample text sample text sample text <br>sample text sample text');
    });
});
