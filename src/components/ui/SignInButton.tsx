'use client';
import { signIn } from 'next-auth/react';
import { Button } from './button';

interface SignInButtonProps {}

const SignInButton = ({}: SignInButtonProps) => {
	return <Button onClick={() => signIn('google')}>Sign In</Button>;
};

export default SignInButton;
