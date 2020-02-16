import React, { ReactElement } from 'react';
import { NativeSyntheticEvent, StyleProp, TextInput, TextInputKeyPressEventData, TextStyle, ViewStyle, TextInputProps } from 'react-native';
interface Props {
    entries: string[];
    containerStyle?: StyleProp<ViewStyle>;
    chipContainerStyle?: StyleProp<ViewStyle>;
    chipTextStyle?: StyleProp<TextStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    delimiters: string[];
    keyboardAppearance: 'default' | 'light' | 'dark';
    clearButtonMode: 'never' | 'while-editing' | 'unless-editing' | 'always';
    placeholder?: string;
    placeholderTextColor?: string;
    autoCapitalize: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect: boolean;
    autoFocus: boolean;
    blurOnSubmit: boolean;
    chipImage?: ReactElement;
    onSubmit: (emails: string[]) => void;
    TextInputProps?: TextInputProps;
}
interface State {
    emails: string[];
    value: string;
}
export default class EmailChipInput extends React.Component<Props, State> {
    input: React.RefObject<TextInput>;
    static defaultProps: {
        delimiters: string[];
        keyboardAppearance: string;
        clearButtonMode: string;
        placeholder: string;
        autoCapitalize: string;
        autoCorrect: boolean;
        autoFocus: boolean;
        blurOnSubmit: boolean;
    };
    state: State;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    render(): JSX.Element;
    handleOnKeyPress: ({ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
    handleOnPressSubmit: () => void;
    handleOnPressChip: (index: number) => void;
    handleOnTextChange: (value: string) => void;
    lastEmail: () => string;
    focus: () => void;
}
export { };
