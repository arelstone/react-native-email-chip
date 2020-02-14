import { isValidEmail } from './validator';

const ExpectValidateEmail = (value: string, expected: boolean) => {
    it(`it should return ${String(expected).toUpperCase()} when parsed ${value}`, () => {
        expect(isValidEmail(value)).toEqual(expected);
    });
};

describe('validator', () => {
    describe('isValidEmail', () => {
        ExpectValidateEmail('info@email.com', true);
        ExpectValidateEmail('info@email.dk', true);
        ExpectValidateEmail('info@email.co.uk', true);
        ExpectValidateEmail('info@email.c', false);
        ExpectValidateEmail('infoemail.c', false);
        ExpectValidateEmail('infoe@mail.c', false);
        ExpectValidateEmail('info.co.uk.c', false);
        ExpectValidateEmail('info', false);
        ExpectValidateEmail('@email.com', false);
        ExpectValidateEmail('@.com', false);
        ExpectValidateEmail('@', false);
    });
});
