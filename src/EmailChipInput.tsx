import React, { createRef, ReactElement } from 'react';
import {
    NativeSyntheticEvent, StyleProp, StyleSheet, TextInput, TextInputKeyPressEventData, TextStyle,
    View, ViewStyle, TextInputProps, KeyboardTypeOptions,
} from 'react-native';
import { isValidEmail } from './utils/validator';
import Chip from './Chip';

const BACKSPACE = 'Backspace';

interface Props {
    /**
     * The entries that should be displayed as chips
     *
     * @type {string[]}
     * @memberof Props
     */
    entries: string[];

    /**
     * Custom styling for the most outer container
     *
     * @type {StyleProp<ViewStyle>}
     * @memberof Props
     */
    containerStyle?: StyleProp<ViewStyle>;

    /**
     * Custom styling for the container that holds all the chips
     *
     * @type {StyleProp<ViewStyle>}
     * @memberof Props
     */
    chipContainerStyle?: StyleProp<ViewStyle>;

    /**
     * Custom styling for the text of the chip
     *
     * @type {StyleProp<TextStyle>}
     * @memberof Props
     */
    chipTextStyle?: StyleProp<TextStyle>;

    /**
     * Custom styling for the container that holds the TextInput
     *
     * @type {StyleProp<ViewStyle>}
     * @memberof Props
     */
    inputContainerStyle?: StyleProp<ViewStyle>;

    /**
     * Custom styling for the TextInput
     *
     * https://facebook.github.io/react-native/docs/textinput#style
     *
     * @type {StyleProp<TextStyle>}
     * @memberof Props
     */
    inputStyle?: StyleProp<TextStyle>;

    /**
     * WHen typing one of these keys the value of the TextInput will be added as ca chip
     * Default is `,` and `;`
     *
     * @type {string[]}
     * @memberof Props
     */
    delimiters: string[];

    /**
     * Custom  Image/Icon for the Chip.
     * This wil be displayed on the right side of the text
     *
     * @type {ReactElement}
     * @memberof Props
     */
    chipImage?: ReactElement;

    /**
     * This method will be called when the user taps the return button or the last character
     * of the string is one of the listed delimiters
     *
     * @memberof Props
     * @callback string[] email
     * @returns void
     */
    onSubmit: (emails: string[]) => void;

    /**
     * Determines the color of the keyboard.
     *
     * https://facebook.github.io/react-native/docs/textinput#keyboardappearance
     *
     * @default default
     * @type {('default' | 'light' | 'dark')}
     * @memberof Props
     */
    keyboardAppearance: 'default' | 'light' | 'dark';

    /**
     * When the clear button should appear on the right side of the text view.
     * This property is supported only for single-line TextInput component.
     *
     * https://facebook.github.io/react-native/docs/textinput#clearbuttonmode
     *
     * @default while-editing
     * @type {('never' | 'while-editing' | 'unless-editing' | 'always')}
     * @memberof Props
     */
    clearButtonMode: 'never' | 'while-editing' | 'unless-editing' | 'always';

    /**
     * The text that should be displayed as the placeholder
     *
     * https://facebook.github.io/react-native/docs/textinput#placeholder
     *
     * @default Start by typing an email
     * @type {string}
     * @memberof Props
     */
    placeholder?: string;

    /**
     * The color of the placeholder
     *
     * https://facebook.github.io/react-native/docs/textinput#placeholdertextcolor
     *
     * @type {string}
     * @memberof Props
     */
    placeholderTextColor?: string;

    /**
     * Can tell TextInput to automatically capitalize certain characters
     *      characters: all characters,
     *      words: first letter of each word
     *      sentences: first letter of each sentence (default)
     *      none: don't auto capitalize anything
     *
     * https://facebook.github.io/react-native/docs/textinput.html#autocapitalize
     *
     * @default none
     * @type {('none' | 'sentences' | 'words' | 'characters')}
     * @memberof Props
     */
    autoCapitalize: 'none' | 'sentences' | 'words' | 'characters';

    /**
     * If false, disables auto-correct
     *
     * https://facebook.github.io/react-native/docs/textinput#autocorrect
     * @default true
     * @type {boolean}
     * @memberof Props
     */
    autoCorrect: boolean;

    /**
     * Should the input be focused when the component mounts
     *
     * https://facebook.github.io/react-native/docs/textinput#autofocus
     *
     * @default false
     * @type {boolean}
     * @memberof Props
     */
    autoFocus: boolean;

    /**
     * If true, the text field will blur when submitted.
     *
     * https://facebook.github.io/react-native/docs/textinput#bluronsubmit
     *
     * @default true
     * @type {boolean}
     * @memberof Props
     */
    blurOnSubmit: boolean;

    /**
     * Customize the props of the TextInput.
     *
     * https://facebook.github.io/react-native/docs/textinput#props
     *
     * @type {TextInputProps}
     * @memberof Props
     */
    TextInputProps?: TextInputProps;

    /**
     * The type of keyboard that should be used
     *
     * https://facebook.github.io/react-native/docs/textinput#keyboardtype
     *
     * @type {KeyboardTypeOptions}
     * @memberof Props
     */
    keyboardType?: KeyboardTypeOptions;
}

interface State {
    emails: string[];
    value: string;
}

export const DELIMITERS = [',', ';', ' '];

export default class EmailChipInput extends React.Component<Props, State> {
    input = createRef<TextInput>();

    static defaultProps = {
        delimiters: DELIMITERS,
        keyboardAppearance: 'default',
        clearButtonMode: 'while-editing',
        placeholder: 'Start by typing an email',
        autoCapitalize: 'none',
        autoCorrect: true,
        autoFocus: false,
        blurOnSubmit: false,
        keyboardType: 'email-address',
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
        const { containerStyle, chipContainerStyle, chipTextStyle, chipImage, inputStyle,
            inputContainerStyle, keyboardAppearance, clearButtonMode, placeholder, placeholderTextColor,
            autoCapitalize, autoCorrect, autoFocus, blurOnSubmit, TextInputProps, keyboardType,
        }: Props = this.props;
        const { emails, value }: State = this.state;

        return <View style={[styles.container, containerStyle]}>
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
                    keyboardType={keyboardType}
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
                    onBlur={this.handleOnPressSubmit}
                    {...TextInputProps}
                />
            </View>
        </View>;
    }

    handleOnKeyPress = ({ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>): void => {
        const { value }: State = this.state;
        const { blurOnSubmit }: Props = this.props;

        if (value && key === BACKSPACE && value !== undefined && value.length < 1) {
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
        } else {
            onSubmit(this.state.emails);
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
        minWidth: 150,
    },
});
