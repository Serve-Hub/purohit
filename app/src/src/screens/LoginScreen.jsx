import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import googleLogo from '../Images/google.png';
import logo from '../Images/logo.png';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [emailError, setEmailError] = useState('');

    // Email Validation
    const validateEmail = (value) => {
        setEmail(value);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.match(emailPattern)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError('');
        }
    };

    return (
        <View className="flex-1 text-lg items-center  justify-center bg-white px-4">
            <View className="flex-row items-center justify-center mb-10">
                <Image
                    source={logo}
                    style={{ width: 80, height: 70, marginRight: 10 }} // Adjusted size
                />
                <Text className="text-2xl font-bold text-center">Welcome Back!</Text>
            </View>



            {/*Email Input */}
            <View className="mb-3 w-full">
                <TextInput
                    placeholder="Enter Your Email"
                    className="border border-borders rounded-lg w-full py-3 px-4"
                    value={email}
                    onChangeText={validateEmail}
                />
                {emailError ? <Text className="text-red-500 text-sm">{emailError}</Text> : null}
            </View>
            {/* Password Input with Show/Hide */}
            <View className="border border-borders rounded-lg w-full py-3 px-4 mb-3 flex-row items-center">
                <TextInput
                    placeholder="Enter Your Password"
                    className="flex-1"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity>
                <Text className="text-blue-500 underline text-right mb-5">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity className="bg-blue-500 w-full py-3 rounded-lg mb-3">
                <Text className="text-white text-center text-lg font-semibold">Login</Text>
            </TouchableOpacity>

            {/* Signup Link */}
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text className="text-blue-500 underline font-semibold text-sm mb-4">
                    Don't have an account?
                </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center w-full mb-4">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="text-gray-600 px-2">Or</Text>
                <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Social Login Buttons */}
            <TouchableOpacity className="bg-blue-700 w-full py-3 rounded-lg flex-row items-center mb-3">
                <View className="w-1/6 flex items-center">
                    <FontAwesome name="facebook" size={30} color="white" />
                </View>
                <View className="w-5/6">
                    <Text className="text-white text-center text-lg font-semibold">Login with Facebook</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-gray-200 w-full py-3 rounded-lg flex-row items-center mb-3 border border-gray-400">
                <View className="w-1/6 flex items-center">
                    <Image
                        source={googleLogo} // Ensure the logo is correctly imported
                        style={{ width: 30, height: 30 }}
                    />
                </View>
                <View className="w-5/6">
                    <Text className="text-black text-center text-lg font-semibold">Login with Google</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-500 w-full py-3 rounded-lg flex-row items-center mb-3" onPress={() => navigation.navigate('Phone')}>
                <View className="w-[15%] flex items-center">
                    <FontAwesome name="phone" size={30} color="white" />
                </View>
                <View className="w-[85%]">
                    <Text className="text-white text-center text-base font-semibold">Continue with Phone</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
};

export default LoginScreen;
