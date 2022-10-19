import React, { FC, ReactElement, useCallback, useRef, useState } from 'react';
import { View, StyleProp, ViewStyle, TextStyle, TextInputProps, KeyboardTypeOptions, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, ColorValue } from 'react-native';
import { Chip } from './components/Chip';
import { BACKSPACE, DELIMITERS } from './constants';
import { styles } from './styles';
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
    placeholderTextColor?: ColorValue;
    autoCapitalize?: TextInputProps['autoCapitalize'];
    autoCorrect?: boolean;
    autoFocus?: boolean;
    blurOnSubmit?: boolean;
    keyboardType?: KeyboardTypeOptions;
    TextInputProps?: TextInputProps;
}

export const EmailChipInput: FC<Props> = ({
    entries, onSubmit,
    chipImage, autoCorrect, TextInputProps,
    containerStyle, chipContainerStyle, inputContainerStyle, inputStyle, placeholderTextColor, chipTextStyle,
    delimiters = DELIMITERS,
    keyboardAppearance = 'default',
    clearButtonMode = 'while-editing',
    placeholder = 'Start by typing an email',
    autoCapitalize = 'none',
    autoFocus = false,
    blurOnSubmit = true,
    keyboardType = 'email-address',

}) => {
    const ref = useRef<TextInput>(null);
    const [emails, setEmails] = useState<string[]>(entries);
    const [value, setValue] = useState<string>('');

    const handleOnPressChip = useCallback((index: number) => {
        setValue(emails[index]);
        setEmails(emails.filter((_, i: number) => i !== index));

        return ref.current?.focus();
    }, [ref, emails]);

    const lastEntry = useCallback(() => emails[emails.length - 1], [emails]);

    const onTextChange = useCallback((value: string) => {
        if (value === lastEntry()) {
            return setValue('');
        }

        if (isValidEmail(value) && delimiters.some(delimiter => value.endsWith(delimiter))) {
            setEmails([
                ...emails,
                value.substring(0, value.length - 1),
            ]);

            return;
        }
    }, [emails, isValidEmail]);

    const onKeyPress = useCallback(({ nativeEvent: { key } }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (!!value && key === BACKSPACE) {
            setValue(lastEntry());
            setEmails(emails.filter((value) => value !== lastEntry()));
        }

        if (blurOnSubmit) {
            return ref.current?.focus();
        }
    }, [emails, lastEntry, BACKSPACE]);

    const onBlur = useCallback(() => {
        if (!isValidEmail(value)) {
            return onSubmit(emails);
        }

        const newEntries = [...emails, value];

        setEmails(newEntries);
        setValue('');
        onSubmit(newEntries);
    }, [emails, onSubmit]);

    return <View style={[styles.container, containerStyle]}>
        {emails.map((email, index) => <Chip
            index={index}
            value={email}
            onPress={handleOnPressChip}
            key={index}
            chipContainerStyle={chipContainerStyle}
            chipImage={chipImage}
            chipTextStyle={chipTextStyle}
        />)}

        <View style={[styles.inputContainer, inputContainerStyle]}>
            <TextInput
                value={value}
                ref={ref}
                onChangeText={onTextChange}
                onKeyPress={onKeyPress}
                onSubmitEditing={onBlur}
                onBlur={onBlur}
                blurOnSubmit={blurOnSubmit}
                keyboardType={keyboardType}
                clearButtonMode={clearButtonMode}
                autoCorrect={autoCorrect}
                autoFocus={autoFocus}
                placeholder={placeholder}
                autoCapitalize={autoCapitalize}
                keyboardAppearance={keyboardAppearance}
                placeholderTextColor={placeholderTextColor}
                style={[styles.input, inputStyle]}
                {...TextInputProps}
            />
        </View>
    </View>;
};
