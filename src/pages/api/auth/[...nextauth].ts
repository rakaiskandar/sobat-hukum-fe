import NextAuth, { NextAuthOptions, User as NextAuthUser, Session as NextAuthSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";
import { Role } from "@/constant/role";

// Define the types for the user and session objects
interface User extends NextAuthUser {
  username: string;
  role: Role;
  is_verified: Boolean;
  refreshToken: string;
  accessToken: string;
}

interface Session extends NextAuthSession {
  user: User; // This should be a User object
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post(
            "http://localhost:8000/api/v1/login/",
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );

          const user = res.data; // Adjust to ensure you're getting user data correctly
      
          if (user && user.access && user.refresh) {
            // Return user with access and refresh tokens
            return {
              ...user.user,
              accessToken: user.access,
              refreshToken: user.refresh,
            };
          }
          return null;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    // JWT callback to handle token management
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.name = user.name;
        token.is_verified = user.is_verified;
        token.username = user.username;
        token.role = user.role;
        token.id = user.id; // Ensure the role is added to the JWT token
      }
      return token;
    },

    // Session callback to set session information
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          name: token.name,
          username: token.username,
          profile: token.profile,
          id: token.id,
          is_verified: token.is_verified,
          role: token.role,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Replace with a secure secret
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(options);
