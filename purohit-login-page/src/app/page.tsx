// src/app/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white md:flex-row">
      <div className="flex flex-col items-center justify-center md:w-1/2">
        <Image src="/purohit-logo-04.png" alt="Purohit Logo" width={150} height={150} />
        <h2 className="mt-4 text-2xl font-semibold text-center text-black">
          Your Personalized <span className="text-orange-600">Pandit</span> Service,<br /> 
          <span className="text-orange-600">Anytime, Anywhere</span>
        </h2>
      </div>
      <div className="flex flex-col w-full md:w-1/2 p-6">
        <h1 className="text-3xl font-bold mb-4 text-black ">Log in to your account</h1>
        <p className="mb-4 text-gray-800 ">Welcome back! Please enter your details.</p>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="********"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="remember"
              className="mr-2"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">Remember for 30 days</label>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md">
            Sign in
          </button>
          <div className="mt-4 text-center">
          <a href="/forgot-password" className="text-blue-600">Forgot password?</a>

          </div>
          <div className="mt-4 text-center text-gray-500">
            <p>Don't have an account? <Link href="/signup" className="text-blue-600">Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
