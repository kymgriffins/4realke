import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { users } from '@/lib/schema';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await db.select().from(users).where(eq(users.email, credentials.email)).limit(1);
        if (user.length === 0) {
          return null;
        }
        const isValid = await bcrypt.compare(credentials.password, user[0].password);
        if (!isValid) {
          return null;
        }
        return {
          id: user[0].id.toString(),
          email: user[0].email,
          name: user[0].name,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
};
