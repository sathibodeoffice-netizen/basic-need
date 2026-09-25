import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

const ADMIN_EMAILS = ['sathibodeoffice@gmail.com'];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectToDatabase();

        let user = await User.findOne({ email: credentials.email }).select("+password");

        if (!user) {
          // Auto register new user
          const role = ADMIN_EMAILS.includes(credentials.email) ? 'ADMIN' : 'CUSTOMER';
          user = await User.create({
            name: credentials.email.split('@')[0],
            email: credentials.email,
            password: credentials.password,
            role: role
          });
        } else {
          // If user exists, check password
          if (!user.password) {
            throw new Error("This email is registered with Google. Please use Continue with Google.");
          }
          const isPasswordMatch = await user.comparePassword(credentials.password);
          if (!isPasswordMatch) {
            throw new Error("Invalid password");
          }
          
          // Force admin role if they somehow lost it but still match the admin email
          if (ADMIN_EMAILS.includes(credentials.email) && user.role !== 'ADMIN') {
            user.role = 'ADMIN';
            await user.save();
          }
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await connectToDatabase();
        let dbUser = await User.findOne({ email: user.email });
        
        if (!dbUser) {
          const role = user.email && ADMIN_EMAILS.includes(user.email) ? 'ADMIN' : 'CUSTOMER';
          dbUser = await User.create({
            name: user.name || (user.email ? user.email.split('@')[0] : 'User'),
            email: user.email,
            role: role
          });
        } else {
          // Force admin role if they somehow lost it
          if (user.email && ADMIN_EMAILS.includes(user.email) && dbUser.role !== 'ADMIN') {
            dbUser.role = 'ADMIN';
            await dbUser.save();
          }
        }
        
        // Pass db user details to the token
        user.id = dbUser._id.toString();
        user.role = dbUser.role;
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // Initial sign in
        token.role = (user as any).role;
        token.id = user.id;
      }
      // If user is updated in session, we might want to update token, but not necessary here
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_if_not_set",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
