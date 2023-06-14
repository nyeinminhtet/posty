import { config } from "@/app/config/config";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import FacebookProvider from "next-auth/providers/facebook";

export const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  //@ts-ignore
  adapter: PrismaAdapter(prisma),
  secret: config.authSecret,
  providers: [
    GoogleProvider({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      httpOptions: {
        timeout: 10000,
      },
    }),
    FacebookProvider({
      clientId: config.facebookClientId,
      clientSecret: config.facebookClientSecret,
    }),
  ],
  // providers: [
  //   FacebookProvider({
  //     clientId: config.facebookClientId,
  //     clientSecret: config.facebookClientSecret,
  //   }),
  // ],
  session: {
    strategy: "jwt",
  },
  database: config.databaseUrl,
  // pages: {
  //   signIn: "/auth/signin",
  // },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
