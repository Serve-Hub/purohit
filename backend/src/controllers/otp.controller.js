import jwt, { decode } from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { sendEmail } from "../utils/mailer.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import OTP from "../models/userOTP.model.js";
import { generateOTPToken } from "../utils/auth.js";
import { verifyHashedData } from "../utils/hashData.js";

export const verifyOTP = asyncHandler(async (req, res) => {
  const { token, otp } = req.body;
  if (!token || !otp) {
    throw new ApiError(400, "Empty opt details are not allowed");
  }
  try {
    const decoded = jwt.verify(token, process.env.OTP_SECRET);
    const userOTP = await OTP.findOne({
      email: decoded.email || decoded.userData.email,
    });
    if (verifyHashedData(otp, userOTP.otp)) {
      throw new ApiError(400, "Invalid OTP.");
    }
    //? check whether the otp is expired ot not
    const existingUser = await User.findOne({
      email: decoded.email || decoded.userData.email,
    });
    if (existingUser) {
      throw new ApiError(409, "User with this email already exists.");
    }

    const user = new User({
      email: decoded.email || decoded.userData.email,
      firstName: decoded.firstName || decoded.userData.firstName,
      lastName: decoded.lastName || decoded.userData.lastName,
      password: decoded.password || decoded.userData.password,
      contact: decoded.contact || decoded.userData.contact,
      avatar: decoded.avatar || decoded.userData.avatar,
      isVerified: true, // Mark the user as verified
    });

    const incomingAvatar = await uploadOnCloudinary(user.avatar);
    if (!incomingAvatar) {
      throw new ApiError(400, "Avatar upload failed.");
    }
    await user.save();
    await OTP.deleteMany({ email: user.email });
    return res
      .status(200)
      .json({ message: "Email verified successfully, user created." });
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

export const resendOTPCode = asyncHandler(async (req, res) => {
  const { token, email } = req.body;
  if (!token || !email) {
    throw new ApiError(400, "Empty details are not allowed");
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.OTP_SECRET);
  } catch (error) {
    throw new ApiError(400, "Invalid token.");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.isVerified) {
    return res.status(400).json({
      status: "FAILED",
      message: "User is already verified. No need to resend OTP.",
    });
  }

  const userData = {
    email: decoded.email,
    firstName: decoded.firstName,
    lastName: decoded.lastName,
    password: decoded.password,
    contact: decoded.contact,
    avatar: decoded.avatar,
  };

  const newData = generateOTPToken({ userData });
  await sendEmail({ email });
  res.status(200).json({
    status: "PENDING",
    message: "OTP resent successfully. Please check your email.",
    token: newData.token,
  });
});
