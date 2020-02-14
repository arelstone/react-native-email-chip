import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import EmailChipInput from './EmailChipInput';
import Chip from './Chip';
import { TextInput, Text, View } from 'react-native';
import { findElementByTestId } from './utils/testHelpers';

let wrapper: ShallowWrapper;
let instance: any;

const mockOnSubmit = jest.fn();
describe('<EmailChipInput />', () => {
    beforeAll(() => {
        wrapper = shallow(<EmailChipInput
            label={<Text>Enter a lot of emails....</Text>}
            entries={['john@doe.com']}
            onSubmit={mockOnSubmit}
        />);
    });

    beforeEach(() => {
        instance = wrapper.instance();
    });

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should display a Chip per entry', () => {
        expect(wrapper.find(Chip)).toHaveLength(1);
    });

    it('should display a TextInput', () => {
        expect(wrapper.find(TextInput).exists()).toBeTruthy();
    });

    it('should display a Label', () => {
        expect(findElementByTestId(View, 'Label', wrapper)
            .at(0).find(Text).prop('children'))
            .toEqual('Enter a lot of emails....');
    });

    describe('tapping a Chip', () => {
        beforeAll(() => {
            // @ts-ignore
            wrapper.find(Chip).prop('onPress')(0);
        });

        it('should set the value of the Chip that is tapped as the value of the TextInput', () => {
            expect(wrapper.state('value')).toEqual('john@doe.com');
        });

        it('should remove the value og the Chip that is tapped from state.emails', () => {
            expect(wrapper.state('emails')).toEqual(expect.not.arrayContaining(['john@doe.com']));
        });
    });

    describe('handleOnPressSubmit', () => {
        describe('invalid email', () => {
            beforeAll(() => {
                wrapper.setState({ value: 'sdfdsf@email', emails: ['john@doe.com'] });
            });

            afterAll(() => {
                wrapper.setState({ value: '' });
            });

            it('should return false', () => {
                expect(instance.handleOnPressSubmit()).toBeFalsy();
            });
        });

        describe('valid email', () => {
            beforeAll(() => {
                wrapper.setState({ value: 'jane@email.com' });

                instance.handleOnPressSubmit();
            });

            it('should empty state.value', () => {
                expect(wrapper.state('value')).toEqual('');
            });

            it('should add the value to state.emails', () => {
                expect(wrapper.state('emails')).toEqual(expect.arrayContaining(['jane@email.com']));
            });

            it('should updated state.emails', () => {
                expect(wrapper.state('emails')).toHaveLength(2);
            });

            it('should invoke onSubmit', () => {
                expect(mockOnSubmit).toHaveBeenCalledWith(['john@doe.com', 'jane@email.com']);
            });
        });
    });

    describe('lastEmail', () => {
        it('should return john@doe.com', () => {
            wrapper.setState({ emails: ['john@doe.com'] });
            expect(instance.lastEmail()).toEqual('john@doe.com');
        });

        it('should return jane@doe.com', () => {
            wrapper.setState({ emails: ['john@doe.com', 'jane@doe.com'] });
            expect(instance.lastEmail()).toEqual('jane@doe.com');
        });

        it('should return undefined', () => {
            wrapper.setState({ emails: [] });
            expect(instance.lastEmail()).toBeUndefined();
        });
    });


});
