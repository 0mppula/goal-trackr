'use client';

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
	children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
	const [queryClient] = React.useState(
		() => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default Providers;
