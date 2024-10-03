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
      required: true,
    },
    email: {
      type: String,
      required: true,
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
      type: Number,
      required: true,
      validate: {
        validator: (v) => /^[0-9]{10}$/.test(v), // Adjust the regex as needed
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
    },
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
