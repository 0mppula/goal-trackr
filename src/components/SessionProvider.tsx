'use client';
import React, { ReactNode } from 'react';
import { SessionProvider as Provider } from 'next-auth/react';
import { Session } from 'next-auth';

interface SessionProviderProps {
	children: ReactNode;
	session: Session | null;
}

const SessionProvider = ({ children, session }: SessionProviderProps) => {
	return <Provider>{children}</Provider>;
};

export default SessionProvider;
