'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import ButtonLoading from './ButtonLoading';
import { useToast } from './use-toast';

interface SignOutButtonProps {}

const SignOutButton = ({}: SignOutButtonProps) => {
	const [loading, setLoading] = useState(false);

	const { toast } = useToast();

	const handlesignOut = async () => {
		try {
			setLoading(true);
			await signOut();
		} catch (error) {
			toast({
				title: 'Error signing out.',
				description: 'Please try again later.',
				variant: 'destructive',
			});
		}
	};
	return (
		<ButtonLoading onClick={handlesignOut} disabled={loading}>
			Sign Out
		</ButtonLoading>
	);
};

export default SignOutButton;
