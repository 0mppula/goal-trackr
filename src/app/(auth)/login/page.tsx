import OAuthForm from '@/components/OAuthForm';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const page = async () => {
	return (
		<div className="h-screen container flex flex-col justify-center items-center max-w-lg text-center">
			<Button variant="ghost" className="mb-8" asChild>
				<Link href="/">
					<ChevronLeft className="h-[1.125rem] w-[1.125rem] mr-2" />
					Back to home
				</Link>
			</Button>

			<h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl">
				Welcome back!
			</h1>

			<p className="mt-4">Please sign in using your Google account.</p>

			<OAuthForm />
		</div>
	);
};

export default page;
