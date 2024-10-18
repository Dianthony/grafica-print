import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Clientes from '../pages/Clientes';


const Stack = createNativeStackNavigator();


export default function Routes() {
    return(
        <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}}/>
            <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
            <Stack.Screen name='Clientes' component={Clientes} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}
