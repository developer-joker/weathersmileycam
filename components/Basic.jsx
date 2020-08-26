import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    StatusBar,
    ImageBackground,
} from 'react-native';

const image = require('../assets/joker.jpeg');

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground source={image} style={styles.image}>
                <Text style={styles.text}>Welcome to My First App</Text>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 30,
    },
});