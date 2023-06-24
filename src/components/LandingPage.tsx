import Link from 'next/link';
import React from 'react';

const LandingPage = () => {
	return (
		<div className="max-w-2xl flex flex-col justify-start lg:justify-center h-full mx-auto mt-32 lg:mt-0 items-center lg:items-start text-center lg:text-left">
			<h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl">
				Welcome to GoalStackr
			</h1>

			<h2 className="mt-4 scroll-m-20 border-b pb-2 text-3xl lg:text-4xl font-semibold tracking-tight transition-colors first:mt-0 text-center lg:text-left">
				A free goal tracking application 📈
			</h2>

			<p className="leading-7 [&:not(:first-child)]:mt-6 max-w-xl lg:max-w-none text-center lg:text-left">
				Unlock the power to turn your aspirations into reality!{' '}
				<Link
					href="/"
					className="underline underline-offset-2 text-purple-800 dark:text-purple-200"
				>
					Sign in
				</Link>{' '}
				and take charge of your goals by tracking your progress every step of the way.
			</p>
		</div>
	);
};

export default LandingPage;
