import bcrypt from "bcrypt";
import asyncHandler from "./asyncHandler.js";

const hashData = async (data, saltRounds = 10) => {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return await bcrypt.hash(data, 10);
  } catch (error) {
    throw new Error("Failed to hash data: " + error.message);
  }
};

const verifyHashedData = asyncHandler(async (unHashed, hashed) => {
  const match = await bcrypt.compare(unHashed, hashed);
  return match;
});
export { hashData, verifyHashedData };
