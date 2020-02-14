import { testId } from './testHelpers';

describe('testHelpers', () => {
    describe('testId', () => {
        it('should return an object with testID', () => {
            expect(testId('hello world')).toEqual({ testID: 'hello world' });
        });
    });
});
