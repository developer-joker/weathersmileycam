import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons, Feather } from 'react-native-vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
//screen
import Home from '../screen/Home';
import Weather from '../screen/Weather';
import SmileyCam from '../screen/SmileyCam';

const Tab = createMaterialBottomTabNavigator();

const getHeaderName = function (route) {
    return route?.state?.routeNames[route.state.index] || 'Home';
};

export default function BottomTab() {
    const navigation = useNavigation();
    const route = useRoute();
    const name = getHeaderName(route);

    navigation.setOptions({
        headerTitle: name,
    });
    return (
        <Tab.Navigator
            initialRouteName="Home"
            barStyle={styles.bottomBack} //바탐 네비게이터 백그라운드 컬러
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: '홈',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="home-outline"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Weather"
                component={Weather}
                options={{
                    tabBarLabel: '날씨',
                    tabBarIcon: ({ color }) => (
                        <Feather name="sun" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="SmileyCam"
                component={SmileyCam}
                options={{
                    tabBarLabel: '카메라',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="camera-wireless-outline"
                            color={color}
                            size={26}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    bottomBack: {
        backgroundColor: 'white',
    },
});
