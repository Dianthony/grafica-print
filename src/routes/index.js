import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Customer from '../pages/Customer';
import Debts from '../pages/Debts';


const Stack = createNativeStackNavigator();


export default function Routes() {
    return(
        <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}}/>
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
            <Stack.Screen name='Customer' component={Customer} options={{headerShown: false}}/>
            <Stack.Screen name='Debts' component={Debts} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}
