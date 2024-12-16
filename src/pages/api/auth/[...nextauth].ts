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

const fetchUserFromAPI = async (accessToken: string) => {
  try {
    const res = await axios.get("http://localhost:8000/api/v1/users/me/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data; // Assuming the response contains the latest user data
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data");
  }
};

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const res = await axios.post("http://localhost:8000/api/v1/token/refresh", {
      refresh: refreshToken,
    });

    if (res.data && res.data.access) {
      return res.data.access;
    }
    throw new Error("Failed to refresh access token");
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Token refresh failed");
  }
};

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
        token.id = user.id;
        token.profile_picture = user.profile_picture 
      }

      // If the access token is expired, refresh it
      if (token.accessToken && Date.now() > (Date.now() + 3600 * 1000)) {
        try {
          const newAccessToken = await refreshAccessToken(token.refreshToken as string);
          token.accessToken = newAccessToken;
          token.accessTokenExpiresAt = Date.now() + 3600 * 1000; // Set expiry to 1 hour
        } catch (error) {
          console.error("Error refreshing access token:", error);
        }
      }

      return token;
    },

    // Session callback to set session information
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session) {
        session.user = {
          username: token.username as string,
          name: token.name as string,
          role: token.role as Role,
          is_verified: token.is_verified as boolean,
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
          profile_picture: token.profile_picture as string,
          id: token.id as string,
        };

        try {
          const updatedUser = await fetchUserFromAPI(token.accessToken as string);
          session.user = {
            ...session.user,
            ...updatedUser, // Merge latest user data
          };
        } catch (error) {
          console.error("Failed to update user data in session:", error);
        }
        
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
