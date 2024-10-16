import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Alert } from 'react-native';

const EmailConfirmation = ({ route, navigation }) => {

    const [isSendVisible, setIsSendVisible] = useState(true); // "Send code" button is initially visible
    const [isResendVisible, setIsResendVisible] = useState(false); // "Resend code" button is initially hidden
  
    const [code, setCode] = useState(["", "", "", ""]);

    // Create an array of refs for each input field
    const inputRefs = useRef([]);

    const handleInputChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Automatically move to the next input
        if (text && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            // Move focus to the previous input on backspace if the current box is empty
            inputRefs.current[index - 1].focus();
            const newCode = [...code];
            newCode[index - 1] = '';
            setCode(newCode);
        }
    };
    const { token, email } = route.params;

    const [otpSent, setOtpSent] = useState(false);

    const sendOtpMutation = useMutation({
        mutationFn: async ({ email, token }) => {
            return axios.post(
                'http://192.168.1.64:6000/api/v1/users/register/sendEmailOTP',
                { email, token },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        },
        onSuccess: (response) => {
            console.log("OTP sent successfully:");
            Alert.alert("Success", "OTP sent to your email address.");
            // Set the flag to true after sending OTP
            setOtpSent(true);
        },
        onError: () => {
            Alert.alert("Error", "User already exist");
        },
    });

    // Function to send OTP
    const sendOTP = async () => {
        if (email && token) {
            sendOtpMutation.mutate({ email, token });
            setIsSendVisible(false); // Hide the "Send code" button after pressing it
            setIsResendVisible(true); // Show the "Resend code" button after pressing "Send code"
        }
    };

    const verifyOtpMutation = useMutation({
        mutationFn: async (userdata) => {
            return axios.post(
                'http://192.168.1.64:6000/api/v1/users/register/verifyOtp', // Replace with your actual verification endpoint
                userdata,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        },
        onSuccess: (response) => {
            console.log("OTP verified successfully:");
            Alert.alert("Success", "Registration Successful!");
            navigation.navigate("Login");
        },
        onError: (error) => {
            console.error("Error verifying OTP:", error.response?.data || error.message);
            Alert.alert("Error", "OTP verification failed. Please try again.");
        },
    });

    // Function to handle OTP submission
    const handleSubmit = async () => {
        const userdata = {
            otp: code.join(''),
            token: token,
        };

        // Call the verify OTP mutation
        verifyOtpMutation.mutate(userdata);
    };

    return (
        <View className="flex-1 justify-center items-center px-5 bg-white">
            <Text className="text-2xl font-bold text-center mb-2">Enter OTP</Text>
            <Text className="text-center font-semibold text-gray-500 text-sm mb-9">A 4-digit code was sent to your Email.</Text>

            <View className="flex-row justify-between  mb-10 w-3/4">
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)} // Assign the ref to the corresponding index
                        className="border border-gray-500 rounded-lg w-12 h-12 text-center text-xl"
                        maxLength={1}
                        keyboardType="numeric"
                        value={digit}
                        onChangeText={(text) => handleInputChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)} // Handle backspace press
                    />
                ))}
            </View>

            <View>
      {/* "Send code" button is visible initially */}
      {isSendVisible && (
        <TouchableOpacity onPress={sendOTP}>
          <Text className="text-blue-500 font-bold text-sm mb-8">Send code</Text>
        </TouchableOpacity>
      )}

      {/* "Resend code" button is initially hidden and becomes visible after "Send code" is pressed */}
      {isResendVisible && (
        <TouchableOpacity onPress={sendOTP}>
          <Text className="text-blue-500 font-bold text-sm mb-8">Resend code</Text>
        </TouchableOpacity>
      )}
    </View>

            <TouchableOpacity className="bg-blue-500 py-3 px-20 rounded-lg" onPress={handleSubmit}>
                <Text className="text-white text-lg text-center font-bold">Confirm</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EmailConfirmation;
