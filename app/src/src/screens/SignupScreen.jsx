import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import googleLogo from '../Images/google.png';
import logo from '../Images/logo.png';

const SignupPage = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // First Name Validation
    const validateFirstName = (value) => {
        setFirstName(value);
        if (value.length < 3) {
            setFirstNameError("First name must be at least 3 characters long.");
        } else {
            setFirstNameError('');
        }
    };

    // Last Name Validation
    const validateLastName = (value) => {
        setLastName(value);
        if (value.length < 3) {
            setLastNameError("Last name must be at least 3 characters long.");
        } else {
            setLastNameError('');
        }
    };

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

    // Password Validation
    const validatePassword = (value) => {
        setPassword(value);
        const hasNumber = /\d/; // Regular expression to check for at least one number

        if (value.length < 8) {
            setPasswordError("Password must contain at least 8 characters.");
        } else if (!hasNumber.test(value)) {
            setPasswordError("Password must contain at least one number.");
        } else {
            setPasswordError('');
        }
    };


    const onSignup = () => {
        if (!firstNameError && !lastNameError && !emailError && !passwordError) {
            console.log("Form is valid! Proceeding with signup...");
            // Add your signup logic here
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-white px-4">
            <View className="flex-row items-center justify-center mb-10">
                <Image
                    source={logo}
                    style={{ width: 80, height: 70, marginRight: 10 }} // Adjusted size
                />
                <Text className="text-2xl font-bold text-center">Sign Up</Text>
            </View>

            {/* First and Last Name Inputs */}
            <View className="flex flex-row justify-between mb-3">
                <View className="flex-1 mr-2">
                    <TextInput
                        placeholder="First Name"
                        className="border border-borders rounded-lg py-3 px-4"
                        value={firstName}
                        onChangeText={validateFirstName}
                    />
                    {firstNameError ? <Text className="text-red-500 text-sm">{firstNameError}</Text> : null}
                </View>
                <View className="flex-1">
                    <TextInput
                        placeholder="Last Name"
                        className="border border-borders rounded-lg py-3 px-4"
                        value={lastName}
                        onChangeText={validateLastName}
                    />
                    {lastNameError ? <Text className="text-red-500 text-sm">{lastNameError}</Text> : null}
                </View>
            </View>

            {/* Email Input */}
            <View className="mb-3 w-full">
                <TextInput
                    placeholder="Enter Your Email"
                    className="border border-borders rounded-lg w-full py-3 px-4"
                    value={email}
                    onChangeText={validateEmail}
                />
                {emailError ? <Text className="text-red-500 text-sm">{emailError}</Text> : null}
            </View>

            {/* Password Input */}
            <View className="border border-borders rounded-lg w-full py-3 px-4 mb-3 flex-row items-center">
                <TextInput
                    placeholder="Enter Your Password"
                    className="flex-1"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={validatePassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Icon
                        name={showPassword ? 'visibility' : 'visibility-off'}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
            {passwordError ? <Text className="text-red-500 text-sm mb-3">{passwordError}</Text> : null}

            {/* Signup Button */}
            <TouchableOpacity
                className="bg-blue-500 w-full py-3 rounded-lg mb-3"
                onPress={onSignup}
            >
                <Text className="text-white text-center text-lg font-semibold">Signup</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-blue-500 underline font-semibold text-sm mb-4">
                    Already have an account?{' '}
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
                    <Text className="text-white text-center text-lg font-semibold">Continue with Facebook</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-gray-200 w-full py-3 rounded-lg flex-row items-center mb-3 border border-gray-400">
                <View className="w-1/6 flex items-center">
                    <Image
                        source={googleLogo}
                        style={{ width: 30, height: 30 }}
                    />
                </View>
                <View className="w-5/6">
                    <Text className="text-black text-center text-lg font-semibold">Continue with Google</Text>
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

export default SignupPage;
