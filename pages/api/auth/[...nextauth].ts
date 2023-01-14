import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '../../util/db.server';

const prisma = db;

const { DISCORD_CLIENT_ID = '', DISCORD_CLIENT_SECRET = '' } = process.env;

if (DISCORD_CLIENT_SECRET === '' || DISCORD_CLIENT_ID === '') {
  throw Error('Missing Discord credentials');
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, user }) {
      session.user.userId = user.id;

      return session;
    },
  },
};

export default NextAuth(authOptions);
