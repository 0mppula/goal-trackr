import Nav from '@/components/Nav';
import SessionProvider from '@/components/SessionProvider';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Home – GoalStackr',
	description: 'A free goal tracking application',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			<body
				className={cn(
					'min-h-screen bg-slate-50 dark:bg-slate-900 antialiased text-slate-800 dark:text-slate-200',
					inter.className
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<SessionProvider session={session}>
						<Nav />
						{children}
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
