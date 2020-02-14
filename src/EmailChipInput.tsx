import React, { createRef, ReactElement } from 'react';
import {
    NativeSyntheticEvent, StyleProp, StyleSheet, TextInput, TextInputKeyPressEventData, TextStyle,
    View, ViewStyle,
} from 'react-native';
import { isValidEmail } from './utils/validator';
import Chip from './Chip';
import { testId } from './utils/testHelpers';

const BACKSPACE = 'Backspace';

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
    label?: ReactElement;
}

interface State {
    emails: string[];
    value: string;
}

export default class EmailChipInput extends React.Component<Props, State> {
    input = createRef<TextInput>();

    static defaultProps = {
        delimiters: [',', ';'],
        keyboardAppearance: 'default',
        clearButtonMode: 'while-editing',
        placeholder: 'Start by typing an email',
        autoCapitalize: 'none',
        autoCorrect: true,
        autoFocus: true,
        blurOnSubmit: false,
    };

    state: State = {
        emails: [],
        value: '',
    };

    componentDidMount() {
        const { entries }: Props = this.props;
        this.setState({ emails: entries });
    }

    componentDidUpdate(prevProps: Props) {
        const { entries }: Props = this.props;
        if (prevProps.entries.length !== entries.length) {
            this.setState({ emails: entries });
        }
    }

    render() {
        const { containerStyle, label, chipContainerStyle, chipTextStyle, chipImage, inputStyle,
            inputContainerStyle, keyboardAppearance, clearButtonMode, placeholder, placeholderTextColor,
            autoCapitalize, autoCorrect, autoFocus, blurOnSubmit,
        }: Props = this.props;
        const { emails, value }: State = this.state;

        return <View style={[styles.container, containerStyle]}>
            {label && <View
                {...testId('Label')}
            >
                {label}
            </View>}

            {emails.map((email: string, index: number) => <Chip
                key={index}
                index={index}
                onPress={(index: number) => this.handleOnPressChip(index)}
                value={email}
                chipContainerStyle={chipContainerStyle}
                chipImage={chipImage}
                chipTextStyle={chipTextStyle}
            />)}

            <View style={[styles.inputContainer, inputContainerStyle]}>
                <TextInput
                    style={[styles.input, inputStyle]}
                    value={value}
                    onChangeText={this.handleOnTextChange}
                    clearButtonMode={clearButtonMode}
                    keyboardType="email-address"
                    autoFocus={autoFocus}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                    keyboardAppearance={keyboardAppearance}
                    onKeyPress={this.handleOnKeyPress}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    blurOnSubmit={blurOnSubmit}
                    onSubmitEditing={this.handleOnPressSubmit}
                    ref={this.input}
                />
            </View>
        </View>;
    }

    handleOnKeyPress = ({ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>): void => {
        const { value }: State = this.state;
        const { blurOnSubmit }: Props = this.props;

        if (key === BACKSPACE && value.length < 1) {
            const { emails }: State = this.state;

            return this.setState({
                value: this.lastEmail(),
                emails: emails.filter((value) => value !== this.lastEmail()),
            });
        }

        if (blurOnSubmit) {
            return this.focus();
        }

        return;
    }

    handleOnPressSubmit = () => {
        const { onSubmit }: Props = this.props;
        const { emails, value }: State = this.state;

        if (isValidEmail(value)) {
            this.setState({
                emails: [...emails, value],
                value: '',
            }, () => onSubmit(this.state.emails));
        }
    }

    handleOnPressChip = (index: number): void => {
        const { emails }: State = this.state;
        const value = emails[index];

        this.setState({
            value,
            emails: emails.filter((_, i: number) => i !== index),
        });

        return this.focus();
    }

    handleOnTextChange = (value: string): void => {
        const { delimiters }: Props = this.props;
        const { emails }: State = this.state;

        if (value === this.lastEmail()) {
            return this.setState({ value: '' });
        }

        if (value.length > 1 && isValidEmail(value) && delimiters.some((delimiter: string) => value.endsWith(delimiter))) {
            
            return this.setState({
                emails: [
                    ...emails,
                    value.substring(0, value.length - 1),
                ],
                value: '',
            });
        }

        return this.setState({ value });
    }

    lastEmail = () => {
        const { emails }: State = this.state;

        return emails[emails.length - 1];
    }

    focus = () => {
        if (this.input.current) {
            this.input.current.focus();
        }
    }
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        paddingVertical: 10,
    },
    inputContainer: {},
    input: {
        fontSize: 16,
        paddingHorizontal: 5,
        paddingVertical: 10,
        minWidth: 200,
    },
});
