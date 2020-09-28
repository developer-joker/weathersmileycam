import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './components/navigator/Stack.jsx';

export default function App() {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    );
}
