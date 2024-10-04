import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import ConfirmationCodeScreen from './src/screens/ConfirmationCodeScreen';
import PhoneSignupScreen from './src/screens/PhoneSignupScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" >
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown:false}}/>
                <Stack.Screen name="Signup" component={SignupScreen}  options={{headerShown:false}}/>
                <Stack.Screen name="Phone" component={PhoneSignupScreen}  options={{headerShown:false}}/>
                <Stack.Screen name="Confirmation" component={ConfirmationCodeScreen}  options={{headerShown:false}}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
