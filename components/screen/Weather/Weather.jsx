import * as React from 'react';
import { StatusBar, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const weatherOptions = {
    Rain: {
        iconName: 'weather-rainy',
        gradient: ['#00C6FB', '#005BEA'],
        title: 'Rain(비)',
        subTitle: '비가오는날이야',
    },
    Clouds: {
        iconName: 'weather-cloudy',
        gradient: ['#304352', '#D7D2CC'],
        title: 'Clouds(구름)',
        subTitle: '구름낀날이야',
    },
    Smoke: {
        iconName: 'weather-fog',
        gradient: ['#304352', '#D7D2CC'],
        title: 'Smoke(안개)',
        subTitle: '안개낀날이야',
    },
    Clear: {
        iconName: 'weather-sunny',
        gradient: ['#fd1d1d', '#fcb045'],
        title: 'Clear(맑음)',
        subTitle: '화창한 날이야',
    },
};

export default function Weather({ temp, condition, location }) {
    const weatherName = weatherOptions[condition].iconName;
    const weatherGradient = weatherOptions[condition].gradient;
    const weatherTitle = weatherOptions[condition].title;
    const weathersubTitle = weatherOptions[condition].subTitle;
    return (
        <LinearGradient colors={weatherGradient} style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <Text>{weatherTitle}</Text>
            <MaterialCommunityIcons
                name={weatherName}
                size={150}
                color="black"
            />
            <Text>{location}</Text>
            <Text>{temp}℃</Text>
            <Text>{weathersubTitle}</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
