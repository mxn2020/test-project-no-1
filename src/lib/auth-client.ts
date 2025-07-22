import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined' 
    ? window.location.origin 
    : "http://localhost:5176",
});

export const { 
  signIn, 
  signUp, 
  signOut, 
  useSession, 
  getSession,
  listSessions,
  revokeSession,
  revokeOtherSessions,
  updateUser,
  changePassword,
  changeEmail,
  deleteUser,
  forgetPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  linkSocial
} = authClient;