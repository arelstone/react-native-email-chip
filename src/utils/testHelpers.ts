import { Platform } from 'react-native';
import { ShallowWrapper } from 'enzyme';

export const testId = (value: string = '') => {
    return Platform.OS === 'ios'
        ? {
            testID: value,
        }
        : {
            accessibleLabel: value,
            accessible: true,
        };
};

export const findElementByTestId = (Component: any, testID: string, wrapper: ShallowWrapper) => {
    return wrapper.find(Component).findWhere((n: any) => n.prop('testID') === testID);
};
