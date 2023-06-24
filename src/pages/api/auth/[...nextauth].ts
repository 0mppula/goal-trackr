import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getGoogleCredentials } from '@/lib/auth';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: getGoogleCredentials().clientId,
			clientSecret: getGoogleCredentials().clientSecret,
		}),
	],
};

export default NextAuth(authOptions);
