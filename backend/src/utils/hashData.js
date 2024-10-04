import bcrypt from "bcrypt";
import asyncHandler from "./asyncHandler.js";

const hashData = async (data, saltRounds = 10) => {
  try {
    return await bcrypt.hash(data, saltRounds);
  } catch (error) {
    throw new Error("Failed to hash data: " + error.message);
  }
};

const verifyHashedData = asyncHandler(async (unHashed, hashed) => {
  return await bcrypt.compare(unHashed, hashed);
});
export { hashData, verifyHashedData };
