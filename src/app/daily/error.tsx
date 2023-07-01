'use client';

import { Button } from '@/components/ui/button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
	return (
		<div className="container pt-8 flex flex-col gap-4 items-center">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-8">
				Something went wrong while loading this page.
			</h1>

			<Button onClick={() => reset()}>Try again</Button>
		</div>
	);
}
