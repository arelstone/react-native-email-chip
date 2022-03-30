import React, { FC, ReactElement, useCallback, useRef, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle, TextInputProps, KeyboardTypeOptions, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { Chip } from './components/Chip';
import { BACKSPACE, DELIMITERS } from './constants';
import { isValidEmail } from './utils/validator';

interface Props {
    entries: string[];
    onSubmit: (emails: string[]) => void;
    delimiters?: string[];
    containerStyle?: StyleProp<ViewStyle>;
    chipContainerStyle?: StyleProp<ViewStyle>;
    chipTextStyle?: StyleProp<TextStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    chipImage?: ReactElement;
    keyboardAppearance?: TextInputProps['keyboardAppearance'];
    clearButtonMode?: TextInputProps['clearButtonMode'];
    placeholder?: string;
    placeholderTextColor?: string;
    autoCapitalize?: TextInputProps['autoCapitalize'];
    autoCorrect?: boolean;
    autoFocus?: boolean;
    blurOnSubmit?: boolean;
    TextInputProps?: TextInputProps;
    keyboardType?: KeyboardTypeOptions;
}


export const EmailChipInput: FC<Props> = ({
    delimiters = DELIMITERS,
    keyboardAppearance = 'default',
    clearButtonMode = 'while-editing',
    placeholder = 'Start by typoing an email',
    autoCapitalize = 'none',
    autoFocus = false,
    blurOnSubmit = true,
    keyboardType = 'email-address',
    containerStyle, chipContainerStyle, chipImage, chipTextStyle, autoCorrect, entries, onSubmit, TextInputProps,
    inputContainerStyle, inputStyle, placeholderTextColor,
}) => {
    const ref = useRef<TextInput>(null);

    const [emails, setEmails] = useState<string[]>(entries);
    const [value, setValue] = useState<string>('');

    const handleOnPressChip = useCallback((index: number) => {
        setValue(emails[index]);
        setEmails(emails.filter((_, i: number) => i !== index));

        return ref.current?.focus();
    }, [ref, emails]);

    const getLastEntry = useCallback(() => emails[emails.length - 1], [emails]);

    const handleOnTextChange = useCallback((value: string) => {
        if (value === getLastEntry()) {
            return setValue('');
        }

        if (value.length > 1 && isValidEmail(value) && delimiters.some((delimiter: string) => value.endsWith(delimiter))) {
            setEmails([
                ...emails,
                value.substring(0, value.length - 1),
            ]);

            return;
        }
    }, [emails, isValidEmail]);

    const handleOnKeyPress = useCallback(({ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (value && key === BACKSPACE && value !== undefined && value.length < 1) {
            setValue(getLastEntry());
            setEmails(emails.filter((value) => value !== getLastEntry()));
        }

        if (blurOnSubmit) {
            return ref.current?.focus();
        }
    }, [emails, getLastEntry, BACKSPACE]);

    const handleOnPressSubmit = useCallback(() => {
        if (isValidEmail(value)) {
            const newEntries = [...emails, value];

            setEmails(newEntries);
            setValue('');

            onSubmit(newEntries);
        } else {
            onSubmit(emails);
        }
    }, [emails, onSubmit]);

    return <View style={[styles.container, containerStyle]}>
        {emails.map((email: string, index: number) => <Chip
            key={index}
            index={index}
            onPress={(index: number) => handleOnPressChip(index)}
            value={email}
            chipContainerStyle={chipContainerStyle}
            chipImage={chipImage}
            chipTextStyle={chipTextStyle}
        />)}

        <View style={[styles.inputContainer, inputContainerStyle]}>
            <TextInput
                style={[styles.input, inputStyle]}
                value={value}
                onChangeText={handleOnTextChange}
                clearButtonMode={clearButtonMode}
                keyboardType={keyboardType}
                autoFocus={autoFocus}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                keyboardAppearance={keyboardAppearance}
                onKeyPress={handleOnKeyPress}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                blurOnSubmit={blurOnSubmit}
                onSubmitEditing={handleOnPressSubmit}
                ref={ref}
                onBlur={handleOnPressSubmit}
                {...TextInputProps}
            />
        </View>
    </View>;
};





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
