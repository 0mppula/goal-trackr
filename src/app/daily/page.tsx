import GoalList from '@/components/GoalList';
import getQueryClient from '@/components/rq/getQueryClient';

import { Hydrate, dehydrate } from '@tanstack/react-query';

const page = async () => {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(['goalDays']);
	const dehydratedState = dehydrate(queryClient);

	return (
		<div className="container pt-8">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-8">
				My Daily Goals
			</h1>

			<Hydrate state={dehydratedState}>
				<GoalList />
			</Hydrate>
		</div>
	);
};

export default page;
