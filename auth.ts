import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './lib/zod';
import { cookies } from 'next/headers';


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        // Validate credentials with Zod
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error('Invalid credentials:', parsedCredentials.error.errors);
          return null;
        }

        try {
          // Call the external API for login
          const live_url = process.env.NEXT_PUBLIC_API_URL;
          const response = await fetch(
            `${live_url}/api/user`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: credentials.username,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData.message);
            return null;
          }

          const data = await response.json();
          console.log(data)

          // Successful login, map the token and email to a User object
          if (data.user.username) {
            return {
              id: data.access_token, // Required User field
              email: credentials.email, // Required User field
            } as User; // Ensure it conforms to the User type
          }

          return null;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Set the cookie when a user signs in via either provider
    async jwt({ token, user }) {
      if (user) {
        // Add the user information to the token
        token.id = user.id as string;

        // Set a cookie after successful login
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10); // Cookie expires in 10 minutes
        (await cookies()).set('loggedin', 'true', { expires: expiresAt });
      }
      return token;
    },

    async session({ session, token }) {
      // Store the access token in the session object
      session.user.id = token.id;
      return session;
    },

    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      if (pathname.startsWith('/auth/signin') && isLoggedIn) {
        // Redirect logged-in users away from the signin page
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return !!auth; // Return whether the user is authorized
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
});