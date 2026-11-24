import { createAuthClient } from "better-auth/client";
import env from "@/config/env";

export const googleAuthEnabled = env.VITE_GOOGLE_AUTH === "true";

export const authClient = createAuthClient({
  baseURL: env.VITE_API_ORIGIN,
  plugins: [],
});

export const { signIn, signOut, useSession } = authClient;

// export const requestGoogleCalenderAccess = async () => {
//   await authClient.linkSocial({
//     provider: "google",
//     callbackURL: `http://localhost:5173`,
//   });
// };
