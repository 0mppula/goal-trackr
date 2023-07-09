import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import ThemeToggler from './ThemeToggler';
import SignInButton from './ui/SignInButton';
import SignOutButton from './ui/SignOutButton';
import { Button } from './ui/button';

const Nav = async () => {
	const session = await getServerSession(authOptions);

	return (
		<nav className="h-20 backdrop-blur-sm border-b-2 border-slate-200 dark:border-slate-800 py-4 z-50 fixed top-0 left-0 right-0 flex items-center bg-slate-100/75 dark:bg-slate-900/75">
			<div className="container flex justify-between items-center">
				<Button variant="link" asChild>
					<Link href="/">GoalTrackr</Link>
				</Button>

				<div className="flex items-center gap-2 md:gap-4">
					<ThemeToggler />

					<div className="hidden md:flex items-center gap-4">
						{session ? (
							<>
								<Button variant="ghost" asChild>
									<Link href="daily">Daily Goals</Link>
								</Button>

								<SignOutButton />
							</>
						) : (
							<SignInButton />
						)}
					</div>

					<MobileMenu />
				</div>
			</div>
		</nav>
	);
};

export default Nav;
