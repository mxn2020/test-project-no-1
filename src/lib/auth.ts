import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Create MongoDB client
const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://localhost:27017/vite-react-mongo";

const client = new MongoClient(mongoUri);

// Create auth instance with MongoDB adapter
export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-key-change-this-in-production-min-32-chars",
    emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:5176",
    "http://localhost:8889",
    "https://localhost:8889",
  ],
});