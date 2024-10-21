'use client'
import React from 'react';
import Image from 'next/image';
import SignupForm from '../Mycomps/SignupForm';  

function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white md:flex-row">
      {/* Left Side: Background Image and Text */}
      <div className="flex flex-col items-center justify-center md:w-1/2 bg-signup-bg p-8 relative">
        <Image
          src="/image.png"
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
        <SignupForm />  {/* Corrected component usage */}
      </div>
    </div>
  );
}

export default SignupPage;
