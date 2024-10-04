import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import googleLogo from '../Images/google.png';
import CountryPicker from 'react-native-country-picker-modal'

const PhoneSignupScreen = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('NP');
    const [callingCode, setCallingCode] = useState('977');
    const [isValid, setIsValid] = useState(true);
    const [isPickerVisible, setPickerVisible] = useState(false);

    const handlePhoneNumberChange = (text) => {
        setPhoneNumber(text);

        // Basic phone number validation (checks for 10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        setIsValid(phoneRegex.test(text));
    };

    const handleConfirm = () => {
        if (isValid) {
            console.log('Phone Number Submitted:', `+${callingCode} ${phoneNumber}`);
            navigation.navigate('Confirmation');
            // Handle the phone number submission logic here
        }
    };

    return (
        <View className="flex-1 justify-center items-center p-5 bg-white">
            {/* Title */}
            <Text className="text-lg font-semibold mb-5">Enter your mobile number</Text>

            {/* Phone Number Input */}
            <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2 mb-3 w-full">
                {/* Country Picker */}
                <TouchableOpacity onPress={() => setPickerVisible(true)} className="flex-row items-center mr-3">
                    <CountryPicker
                        countryCode={countryCode}
                        withFilter
                        withFlag
                        withCallingCode
                        withEmoji
                        onSelect={(country) => {
                            setCountryCode(country.cca2);
                            setCallingCode(country.callingCode[0]);
                        }}
                        visible={isPickerVisible}
                        onClose={() => setPickerVisible(false)}
                    />
                    <Text className="ml-1">+{callingCode}</Text>
                </TouchableOpacity>

                {/* Phone Number Input Field */}
                <TextInput
                    className="flex-1 text-lg"
                    placeholder="Enter your mobile number"
                    keyboardType="numeric"
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                />
            </View>

            {/* Validation Error */}
            {!isValid && (
                <Text className="text-red-600 text-sm mb-2">This phone number is invalid</Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity
                onPress={handleConfirm}
                disabled={!isValid}
                className={`w-full py-3 rounded-lg ${isValid ? 'bg-blue-500' : 'bg-gray-400'
                    } justify-center items-center`}
            >
                <Text className="text-white font-semibold">Confirm</Text>
            </TouchableOpacity>

            {/* Disclaimer */}
            <Text className="text-gray-600 text-center mt-4">
                By proceeding, you consent to get calls, WhatsApp, or SMS messages, including by automated means, from App and its affiliates to the number provided.
            </Text>

            {/* Divider */}
            <View className="flex-row items-center my-4">
                <View className="flex-1 h-0.5 bg-gray-300" />
                <Text className="text-gray-600 mx-2">Or</Text>
                <View className="flex-1 h-0.5 bg-gray-300" />
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

        </View>


    );
};

export default PhoneSignupScreen;
