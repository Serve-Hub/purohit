'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Don't forget to import axios
import PasswordValidation from './PasswordValidation';
import TermsAndConditions from '@/src/Mycomps/TermsAndConditions';
import { useRouter } from 'next/navigation'; // Import useRouter


const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const [isAgreed, setIsAgreed] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    isUpperCase: false,
    isLowerCase: false,
    isNumber: false,
    isSpecialChar: false,
    isMinLength: false,
  });

  useEffect(() => {
    setPasswordValidation({
      isUpperCase: /[A-Z]/.test(formData.password),
      isLowerCase: /[a-z]/.test(formData.password),
      isNumber: /\d/.test(formData.password),
      isSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
      isMinLength: formData.password.length >= 8,
    });
  }, [formData.password]);

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);


  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    const response = await axios.post("http://localhost:5000/api/v1/users/register", formData );
    console.log(response);

    if (response.data.success) {
      alert("successfull registeration")
      const token = response.data.data.token;
console.log(formData.email)

      
      // const userData = { token, email };

      // Navigate to the verification page, passing userData if needed
      router.push(`/verification?token=${token}&email=${formData.email}`);
   
             }
  };



return (
  <form onSubmit={handleSubmit}>
    {/* Name Fields */}
    <div className="mb-4">
      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
        First Name
      </label>
      <input
        type="text"
        id="first-name"
        name="firstName"
        value={formData.firstName}
        onChange={handleInput}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        placeholder="Enter your first name"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
        Last Name
      </label>
      <input
        type="text"
        id="last-name"
        name="lastName"
        value={formData.lastName}
        onChange={handleInput}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        placeholder="Enter your last name"
        required
      />
    </div>

    {/* Email Field */}
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email Address
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInput}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        placeholder="Enter your email"
        required
      />
    </div>

    {/* Password Field */}
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Create Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInput}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        placeholder="Create Password"
        required
      />
      <PasswordValidation validation={passwordValidation} />
    </div>

    {/* Terms and Conditions */}
    <TermsAndConditions isAgreed={isAgreed} setIsAgreed={setIsAgreed} />

    {/* Submit Button */}
    <button
      type="submit"
      className={`w-full text-white font-bold py-2 rounded-md ${isPasswordValid && isAgreed ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
      disabled={!isPasswordValid || !isAgreed}
    // || mutation.isLoading
    >
      create an account
      {/* {mutation.isLoading ? 'Submitting...' : 'Create an account'} */}
    </button>

    <div className="mt-4 text-center text-gray-600">
      <p>
        Already a member? <a href="/" className="text-blue-600">Login</a>
      </p>
    </div>
  </form>
);
}


export default SignupForm;