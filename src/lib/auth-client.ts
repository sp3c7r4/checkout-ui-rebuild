import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // Your Hono server URL
  plugins: [],
});

export const { signIn, signOut, useSession } = authClient;

// export const requestGoogleCalenderAccess = async () => {
//   await authClient.linkSocial({
//     provider: "google",
//     callbackURL: `http://localhost:5173`,
//   });
// };
