'use client'
import React from 'react'

const PasswordValidation = ({validation }: { validation: any})=> {
  return (
    <ul className="mb-4 text-sm">
      <li className={validation.isUpperCase ? 'text-green-600' : 'text-red-600'}>
        {validation.isuppercase ? '✔' : '✖'} Include at least 1 uppercase letter
      </li>
      <li className={validation.isMinLength ? 'text-green-600' : 'text-red-600'}>
        {validation.isMinLength ? '✔' : '✖'} Must be at least 8 characters long
      </li>
      <li className={validation.isNumber ? 'text-green-600' : 'text-red-600'}>
        {validation.isNumber ? '✔' : '✖'} Include at least 1 number
      </li>
      <li className={validation.isSpecialChar ? 'text-green-600' : 'text-red-600'}>
        {validation.isSpecialChar ? '✔' : '✖'} Include at least 1 special character
      </li>
      <li className={validation.isLowerCase ? 'text-green-600' : 'text-red-600'}>
        {validation.isLowerCase ? '✔' : '✖'} Include at least 1 lowercase letter
      </li>
    </ul>
  );
};

export default PasswordValidation;