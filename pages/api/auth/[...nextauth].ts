import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { DISCORD_CLIENT_ID = '', DISCORD_CLIENT_SECRET = '' } = process.env;

if (DISCORD_CLIENT_SECRET === '' || DISCORD_CLIENT_ID === '') {
  throw Error("Missing Discord credentials");
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],
});
