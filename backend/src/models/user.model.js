import { Schema, model } from "mongoose";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/token.service.js";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 30,
    },
    avatar: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      maxLength: 65,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    contact: {
      type: String,
      required: false,
      validate: {
        validator: (v) => {
          if (!v) return true; // Allow null/undefined values
          return /^\+?[0-9]{10,15}$/.test(v); // Validate if there's a value
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },googleId: { type: String, unique: true },
    // forgotPasswordToken: String,
    // forgotPasswordTokenExpiry: Date,
    // verifyToken: String,
    // verifyTokenExpiry: Date,

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return generateAccessToken(this);
};

userSchema.methods.generateRefreshToken = function () {
  return generateRefreshToken(this);
};

//create a table
const User = model("User", userSchema);

export default User;
