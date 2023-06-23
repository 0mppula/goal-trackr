'use client';
import React, { ReactNode } from 'react';
import { SessionProvider as Provider } from 'next-auth/react';

interface SessionProviderProps {
	children: ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
	return <Provider>{children}</Provider>;
};

export default SessionProvider;
