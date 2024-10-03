import { Schema, model } from "mongoose";

const userOTPSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

const OTP = model("OTP", userOTPSchema);

export default OTP;
