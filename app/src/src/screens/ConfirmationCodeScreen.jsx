import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const ConfirmationCodeScreen = () => {
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

    return (
        <View className="flex-1 justify-center items-center px-5 bg-white">
            <Text className="text-2xl font-bold text-center mb-2">Enter OTP</Text>
            <Text className="text-center font-semibold text-gray-500 text-sm mb-9">A 4-digit code was sent to your mobile number.</Text>

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

            <TouchableOpacity>
                <Text className="text-blue-500 font-bold text-sm mb-8">Resend code</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-blue-500 py-3 px-20 rounded-lg">
                <Text className="text-white text-lg text-center font-bold">Confirm</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ConfirmationCodeScreen;
