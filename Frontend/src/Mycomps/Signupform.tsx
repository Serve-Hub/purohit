import React, {useState} from 'react';
import PasswordValidation from './PasswordValidation';
import TermsAndConditions from './TermsAndConditions';

function SignupForm() {
   
    {/*--UseState Logic for password and checkboxes--*/}
    const[password, setPassword] = useState('');
    const[isAgreed, setIsAgreed]= useState(false);
    const [passwordValidation, setPasswordValidation] = useState({
        isUpperCase: false,
        isLowerCase: false,
        isNumber: false,
        isSpecialChar: false,
        isMinLength: false,

    });

    useEffect(() => {
        setPasswordValidation({
        isUpperCase: /[A-Z]/.test(password),
        isLowerCase: /[a-z]/.test(password),
        isNumber: /\d/.test(password),
        isSpecialChar:/[!@#$%^&*(),.?":{}|<>]/.test(password),
        isMinLength : password.length>= 8,
    });
}, [password]);

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
   
        <form onSubmit={handleSubmit}>
        {/* Name Fields */}
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
  
        {/* Email Field */}
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
  
        {/* Password Field */}
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
          <PasswordValidation validation={passwordValidation} />
        </div>
  
        {/* Terms and Conditions */}
        <TermsAndConditions isAgreed={isAgreed} setIsAgreed={setIsAgreed} />
  
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
      </form>
      
      
    );
  };
  

export default SignupForm;