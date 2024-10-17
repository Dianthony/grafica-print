import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import SingIn from '../pages/SingIn';
import Home from '../pages/Home';
import Clientes from '../pages/Clientes';


const Stack = createNativeStackNavigator();

console.log("Teste")
console.log(Home)

export default function Routes() {
    return(
        <Stack.Navigator>
            <Stack.Screen name='Home' component={Home}/>
        </Stack.Navigator>
    )
}
