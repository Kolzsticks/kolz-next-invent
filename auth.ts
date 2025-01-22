import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


async function login(credentials: any) {
  try {
    const base_url = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${base_url}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to authenticate');
    }

    const res = await response.json();

    return {
      id: res.user.id,
      name: res.user.name || res.user.username, // fallback to username if name isn't available
      username: res.user.username,
      role: res.user.role,
      accessToken: res.user.access_token,
    };
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Something went wrong.");
  }
}
export const config: NextAuthConfig = {
  pages: { signIn: "/auth/signin" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "enter username" },
        password: { label: "Password", type: "password", placeholder: "******" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const user = await login(credentials);
          // console.log(user)
          return user;
        } catch (e) {
          console.error('Authentication error:', e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
        // @ts-ignore
        session.user.accessToken = token.accessToken;
      }
      // console.log(session);
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  // session:{
  //   maxAge: 60
  // }
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
