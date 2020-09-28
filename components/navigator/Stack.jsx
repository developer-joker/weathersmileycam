import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from './BottomTab';

const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="BottomTab" component={BottomTab} />
        </Stack.Navigator>
    );
}
