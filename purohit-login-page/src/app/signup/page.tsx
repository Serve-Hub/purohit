'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const Signup = () => {
  const [password, setPassword] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  // Password validation logic
  const passwordValidation = {
    isUpperCase: /[A-Z]/.test(password),
    isLowerCase: /[a-z]/.test(password),
    isNumber: /\d/.test(password),
    isSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    isMinLength: password.length >= 8,
  };
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid || !isAgreed) {
      alert('Please fulfill all password requirements and agree to the terms.');
    } else {
      console.log('Form submitted successfully');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white md:flex-row">
      {/* Left Side: Background Image and Text */}
      <div className="flex flex-col items-center justify-center md:w-1/2 bg-signup-bg p-8 relative">
        {/* Add Image here */}
        <Image
          src="/your-image.jpg" // Replace with your actual image path
          alt="Signup Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-70"
        />
        <h2 className="text-3xl font-semibold text-white text-center z-10">
          "Connecting You <br /> with Expert Pandits <br /> for Every Occasion"
        </h2>
      </div>

      {/* Right Side: Signup Form */}
      <div className="flex flex-col w-full md:w-1/2 p-6 relative z-10">
        <Image src="/purohit-logo-04.png" alt="Purohit Logo" width={150} height={150} />
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Sign up</h1>
        <p className="mb-4 text-gray-800">Create your account in seconds</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
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
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Create Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Create Password"
              required
            />

            {/* Password Validation */}
            <ul className="mb-4 text-sm">
              <li className={passwordValidation.isUpperCase ? 'text-green-600' : 'text-red-600'}>
                {passwordValidation.isUpperCase ? '✔' : '✖'} Include at least 1 uppercase letter
              </li>
              <li className={passwordValidation.isMinLength ? 'text-green-600' : 'text-red-600'}>
                {passwordValidation.isMinLength ? '✔' : '✖'} Must be at least 8 characters long
              </li>
              <li className={passwordValidation.isNumber ? 'text-green-600' : 'text-red-600'}>
                {passwordValidation.isNumber ? '✔' : '✖'} Include at least 1 number
              </li>
              <li className={passwordValidation.isSpecialChar ? 'text-green-600' : 'text-red-600'}>
                {passwordValidation.isSpecialChar ? '✔' : '✖'} Include at least 1 special character
              </li>
              <li className={passwordValidation.isLowerCase ? 'text-green-600' : 'text-red-600'}>
                {passwordValidation.isLowerCase ? '✔' : '✖'} Include at least 1 lowercase letter
              </li>
            </ul>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="mr-2"
              />
              I agree to the terms and privacy policy
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-white font-bold py-2 rounded-md ${
              isPasswordValid && isAgreed ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isPasswordValid || !isAgreed}
          >
            Create an account
          </button>

          <div className="mt-4 text-center text-gray-600">
            <p>Already a member? <a href="/" className="text-blue-600">Login</a></p>
          </div>
          <div className="mt-4 text-center">
            <p>Or continue with</p>
            <div className="flex justify-center space-x-4">
              <button className="border border-gray-300 p-2 rounded-md">Google</button>
              <button className="border border-gray-300 p-2 rounded-md">Facebook</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
