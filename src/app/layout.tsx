import Nav from '@/components/Nav';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Home – GoalStackr',
	description: 'A free goal tracking application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body
				className={cn(
					'min-h-screen bg-slate-50 dark:bg-slate-900 antialiased text-slate-800 dark:text-slate-200',
					inter.className
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<Nav />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
