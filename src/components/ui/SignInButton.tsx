'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import ButtonLoading from './ButtonLoading';
import { useToast } from './use-toast';

const SignInButton = () => {
	const [loading, setLoading] = useState(false);

	const { toast } = useToast();

	const handleSignIn = async () => {
		try {
			setLoading(true);
			await signIn('google');
		} catch (error) {
			toast({
				title: 'Error signing in.',
				description: 'Please try again later.',
				variant: 'destructive',
			});
		}
	};

	return (
		<ButtonLoading onClick={handleSignIn} loading={loading}>
			Sign In
		</ButtonLoading>
	);
};

export default SignInButton;
