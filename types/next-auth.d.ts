import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      role?: string;
      accessToken?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    username: string;
    role?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role?: string;
    accessToken?: string;
  }
}