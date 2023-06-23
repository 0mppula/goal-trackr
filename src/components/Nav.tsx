import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import ThemeToggler from './ThemeToggler';

const Nav = () => {
	return (
		<nav className="flex justify-between items-center border-b-2 border-slate-200 dark:border-slate-800 p-4">
			<Button variant="link" asChild>
				<Link href="/">GoalStackr</Link>
			</Button>

			<div className="flex items-center gap-4">
				<ThemeToggler />

				<Button>Sign In</Button>
			</div>
		</nav>
	);
};

export default Nav;
