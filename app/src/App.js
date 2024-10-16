import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import PhoneSignupScreen from './src/screens/PhoneSignupScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmailConfirmation from './src/screens/EmailConfirmationPage';
// import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

const App = () => {
    return (
        // Wrap the app with QueryClientProvider
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome" >
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
                    <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown:false}}/>
                    <Stack.Screen name="Signup" component={SignupScreen}  options={{headerShown:false}}/>
                    <Stack.Screen name="Phone" component={PhoneSignupScreen}  options={{headerShown:false}}/>
                    <Stack.Screen name="EmailConfirmation" component={EmailConfirmation}  options={{headerShown:false}}/>
                    {/* <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown:false}}/> */}

                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    );
};

export default App;
