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
		<nav className="flex justify-between items-center border-b-2 border-slate-200 dark:border-slate-800 p-4">
			<Button variant="link" asChild>
				<Link href="/">GoalTrackr</Link>
			</Button>

			<div className="flex items-center gap-4">
				<ThemeToggler />

				{session ? <SignOutButton /> : <SignInButton />}
			</div>
		</nav>
	);
};

export default Nav;
