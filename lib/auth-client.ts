import { createAuthClient } from "better-auth/react";

const baseURL = process.env.BETTER_AUTH_URL;

const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signUp, useSession, getSession } = authClient;
