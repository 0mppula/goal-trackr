import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import ThemeToggler from './ThemeToggler';
import SignInButton from './ui/SignInButton';
import SignOutButton from './ui/SignOutButton';
import { Button } from './ui/button';

const Nav = async () => {
	const session = await getServerSession(authOptions);

	return (
		<nav className="border-b-2 border-slate-200 dark:border-slate-800 py-4 z-50 top-0 left-0 right-0">
			<div className="container flex justify-between items-center px-2 lg:px-8">
				<Button variant="link" asChild>
					<Link href="/">GoalTrackr</Link>
				</Button>

				<div className="flex items-center gap-4">
					<ThemeToggler />

					{session ? <SignOutButton /> : <SignInButton />}
				</div>
			</div>
		</nav>
	);
};

export default Nav;
