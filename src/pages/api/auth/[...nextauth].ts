import { getGoogleCredentials } from '@/lib/auth';
import { connectToDB } from '@/lib/db';
import User from '@/models/user';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: getGoogleCredentials().clientId,
			clientSecret: getGoogleCredentials().clientSecret,
		}),
	],
	callbacks: {
		async session({ session }) {
			if (session) {
				await connectToDB();

				// store the user id from MongoDB to session
				const sessionUser = await User.findOne({ email: session?.user?.email });

				session.user.id = sessionUser._id.toString();
			}

			return session;
		},
		async signIn({ user: googleUser }) {
			try {
				await connectToDB();

				// check if user already exists
				const userExists = await User.findOne({ email: googleUser?.email });

				// if not, create a new document and save user in MongoDB
				if (!userExists) {
					await User.create({
						email: googleUser?.email,
						name: googleUser!.name,
						username: googleUser!.name?.replace(/\s/g, '').toLowerCase(),
						image: googleUser?.image,
					});
				}

				return true;
			} catch (error) {
				console.log('Error checking if user exists: ', error);
				return false;
			}
		},
	},
};

export default NextAuth(authOptions);
