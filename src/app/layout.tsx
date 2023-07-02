import Nav from '@/components/Nav';
import Providers from '@/components/rq/Providers';
import SessionProvider from '@/components/SessionProvider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Home – GoalStackr',
	description: 'A free goal tracking application',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body
				className={cn(
					'min-h-screen bg-slate-100 dark:bg-slate-900 antialiased text-slate-800 dark:text-slate-200',
					inter.className
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<SessionProvider>
						<Nav />
						<Toaster />

						<Providers>{children}</Providers>
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
