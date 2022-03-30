import { ShallowWrapper } from 'enzyme';

export const findElementByTestId = (Component: any, testID: string, wrapper: ShallowWrapper) => {
    return wrapper.find(Component).findWhere((n: any) => n.prop('testID') === testID);
};
