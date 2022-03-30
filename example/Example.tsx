import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image } from 'react-native';
import EmailChipInput from '../src';

const App = () => {
    const [selected, setSelected] = useState<string[]>([
        'john@doe.com',
    ]);

    return <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.headline}>Simple</Text>
            <EmailChipInput
                entries={selected}
                onSubmit={(emails: string[]) => setSelected(emails)}
            />
        </View>

        <View style={styles.container}>
            <Text style={styles.headline}>Customized</Text>
            <EmailChipInput
                entries={selected}
                onSubmit={(emails: string[]) => setSelected(emails)}
                containerStyle={{ backgroundColor: 'lightgray' }}
                inputContainerStyle={{ borderBottomColor: 'gray', borderBottomWidth: 2 }}
                inputStyle={{ borderWidth: 1 }}
                chipContainerStyle={{ backgroundColor: 'darkgray' }}
                chipTextStyle={{ color: 'black', fontSize: 16 }}
                chipImage={
                    <Image
                        source={{ uri: 'https://pngimage.net/wp-content/uploads/2018/06/react-icon-png-1.png' }}
                        style={{ width: 20, height: 20 }}
                    />
        }
            />
        </View>
    </SafeAreaView>;
};

export default App;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    headline: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
