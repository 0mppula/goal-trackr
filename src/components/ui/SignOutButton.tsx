'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import ButtonLoading from './ButtonLoading';

interface SignOutButtonProps {}

const SignOutButton = ({}: SignOutButtonProps) => {
	const [loading, setLoading] = useState(false);

	const handlesignOut = async () => {
		try {
			setLoading(true);
			await signOut();
		} catch (error) {
			// TOAST ME
			console.error('Error signing out');
		}
	};
	return (
		<ButtonLoading onClick={handlesignOut} disabled={loading}>
			Sign Out
		</ButtonLoading>
	);
};

export default SignOutButton;
