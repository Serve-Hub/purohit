import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Image src="/purohit-logo.png" alt="Purohit Logo" width={100} height={100} />
          <h2 className="mt-4 text-2xl font-semibold text-center">Your Personalized Pandit Service,<br /> Anytime, Anywhere</h2>
        </div>
        <h3 className="text-xl font-semibold mb-4 text-center">Log in to your account</h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input type="password" placeholder="Enter your password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">Sign In</button>
        </form>
        <div className="flex justify-between mt-4">
          <Link href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</Link>
          <Link href="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
