'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [restoken,setRestoken]=useState('');
  const router = useRouter(); // Using the Next.js router for navigation
  const [otpSent, setOtpSent] = useState(false); // State to track OTP status

  // Handle OTP submission
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
console.log(token,email);

  const sendOtp=async ()=>{
    setOtpSent(true);

    const response = await axios.post('http://localhost:5000/api/v1/users/register/sendEmailOTP',{email,token},{
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.data.success) {
        alert('OTP sent successfully!');
        setRestoken(response.data.data.token)
    }     
};  
console.log("success token",restoken)


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear any existing error message

    try {
      // Send OTP to backend for verification

      console.log("emailtoken in verify",otp,restoken)
const token=restoken
      const response = await axios.post('http://localhost:5000/api/v1/users/register/verifyOtp', {token,otp });
console.log(response)
      if (response.data.success) {
        setSuccess(true);
        alert('OTP verified successfully!');
        // Navigate to dashboard or login page after successful verification
        router.push('/');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Error verifying OTP. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>

        {error && <p className="text-red-500">{error}</p>}

        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700 mb-2">Enter your OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                required
              />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Verify OTP
            </button>
          </form>
            
        ) : (
          <p className="text-green-500">OTP Verified Successfully!</p>
        )}
        {/* {sucess?<button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={sendOtp}>
              send OTP
            </button>:  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={sendOtp}>
              resend OTP
            </button>} */}
          <br />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={sendOtp}>
            {otpSent ? "Resend OTP" : "Send OTP"} 
            </button>
            
          
      </div>
    </div>
  );
};

export default OTPVerification;
