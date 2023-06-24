'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import ButtonLoading from './ButtonLoading';

const SignInButton = () => {
	const [loading, setLoading] = useState(false);

	const handleSignIn = async () => {
		try {
			setLoading(true);
			await signIn('google');
		} catch (error) {
			// TOAST ME
			console.error('Error signing in');
		}
	};

	return (
		<ButtonLoading onClick={handleSignIn} loading={loading}>
			Sign In
		</ButtonLoading>
	);
};

export default SignInButton;
