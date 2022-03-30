import React, { ReactElement } from 'react';
import { TouchableOpacity, View, StyleProp, ViewStyle, TextStyle, Text, StyleSheet } from 'react-native';
import { testId } from '../utils/testHelpers';

interface Props {
    index: number;
    value: string;
    onPress: (index: number) => void;
    chipContainerStyle?: StyleProp<ViewStyle>;
    chipTextStyle?: StyleProp<TextStyle>;
    chipImage?: ReactElement;
}

export const Chip: React.FC<Props> = ({ chipContainerStyle, index, onPress, chipImage, chipTextStyle, value }) => {
    return <TouchableOpacity
        style={[styles.chipContainer, chipContainerStyle]}
        onPress={() => onPress(index)}
        {...testId(`ChipContainer_${index}`)}
    >
        <Text
            {...testId('Content')}
            style={[styles.chipText, chipTextStyle]}
        >
            {value}
        </Text>

        {chipImage && <View
            style={styles.chipImageContainer}
            {...testId('ChipImage')}
        >
            {chipImage}
        </View>}
    </TouchableOpacity>;
};



const styles = StyleSheet.create({
    chipContainer: {
        backgroundColor: 'lightgray',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chipText: {},
    chipImageContainer: {
        marginLeft: 5,
    },
});
