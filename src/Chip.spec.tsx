import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import Chip from './Chip';
import { Text, View, TouchableOpacity } from 'react-native';
import { findElementByTestId } from './utils/testHelpers';

let wrapper: ShallowWrapper;

const mockOnPress = jest.fn();

describe('<Chip />', () => {
    beforeAll(() => {
        wrapper = shallow(<Chip
            index={0}
            onPress={mockOnPress}
            value="some@email.com"
            chipImage={<Text>x</Text>}
            chipContainerStyle={{ backgroundColor: 'red' }}
            chipTextStyle={{ color: 'white' }}
        />);
    });

    it('should match snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should contain the content in a Text-element', () => {
        expect(wrapper.find(Text).exists()).toBeTruthy();
    });

    it('should display the value in a Text-element', () => {
        expect(findElementByTestId(Text, 'Content', wrapper).prop('children')).toBe('some@email.com');
    });

    it('should contain a chipImage', () => {
        expect(findElementByTestId(View, 'ChipImage', wrapper).exists()).toBeTruthy();
    });

    it('should invoke onPress when tapping the Chip', () => {
        wrapper.find(TouchableOpacity).prop<any>('onPress')();

        expect(mockOnPress).toHaveBeenCalledWith(0);
    });

    describe('without chipImage and extra styling', () => {
        beforeAll(() => {
            wrapper = shallow(<Chip
                index={0}
                onPress={mockOnPress}
                value="some@email.com"
            />);
        });

        it('should match snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
