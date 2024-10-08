import React from 'react';
import Link from 'next/link';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-center text-black">Forgot Password</h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">Send Reset Link</button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/" className="text-blue-500 hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
