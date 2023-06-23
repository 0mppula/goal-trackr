'use client';
import { signOut } from 'next-auth/react';
import { Button } from './button';

interface SignOutButtonProps {}

const SignOutButton = ({}: SignOutButtonProps) => {
	return <Button onClick={() => signOut()}>Sign Out</Button>;
};

export default SignOutButton;
