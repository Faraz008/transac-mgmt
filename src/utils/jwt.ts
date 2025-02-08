import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  console.error("❌ Error: JWT_SECRET is not defined in .env");
  process.exit(1);
}

// ✅ Function to generate a JWT Token
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, secretKey as string, { expiresIn: "1h" });
};

// ✅ Function to verify a JWT Token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey as string);
  } catch (error) {
    return null;
  }
};

console.log("✅ JWT Utility Initialized Successfully!");