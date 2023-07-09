'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2, LogIn, LogOut, Menu, X } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

const MobileMenu = () => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const { status } = useSession();
	const { toast } = useToast();

	const isLoggedIn = status === 'authenticated';

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);

		// Clean up the event listener on component unmount.
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleSignIn = async () => {
		try {
			setLoading(true);
			await signIn('google', { callbackUrl: '/daily' });
		} catch (error) {
			toast({
				title: 'Error signing in.',
				description: 'Please try again later.',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	};

	const handlesignOut = async () => {
		try {
			setLoading(true);
			await signOut();
		} catch (error) {
			toast({
				title: 'Error signing out.',
				description: 'Please try again later.',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="md:hidden">
			<DropdownMenu open={open} onOpenChange={(state) => setOpen(state)}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
						{open ? (
							<X className="h-[1.625rem] w-[1.625rem]" />
						) : (
							<Menu className="h-[1.625rem] w-[1.625rem]" />
						)}

						<span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" onClick={() => setOpen(false)}>
					{isLoggedIn && (
						<DropdownMenuItem>
							<Link href="daily">Daily Goals</Link>
						</DropdownMenuItem>
					)}

					{isLoggedIn && <DropdownMenuSeparator />}
					<DropdownMenuItem
						disabled={loading}
						onClick={isLoggedIn ? handlesignOut : handleSignIn}
					>
						{isLoggedIn ? (
							<div className="flex items-center">
								<span>Sign Out</span>
								{loading ? (
									<Loader2 className="ml-2 h-4 w-4 animate-spin" />
								) : (
									<LogOut className="ml-2 h-4 w-4" />
								)}
							</div>
						) : (
							<div className="flex items-center">
								<span>Sign In</span>
								{loading ? (
									<Loader2 className="ml-2 h-4 w-4 animate-spin" />
								) : (
									<LogIn className="ml-2 h-4 w-4" />
								)}
							</div>
						)}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default MobileMenu;
