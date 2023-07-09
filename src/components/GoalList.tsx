'use client';

import { GetGoalDaysApiData } from '@/types/goalDayApiData';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import moment from 'moment';
import GoalDay from './GoalDay';
import { GoalDayType } from '@/types/goal';
import GoalDaySkeleton from './GoalDaySkeleton';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useGoalStore from '@/store/useGoalStore';
import { getGoalDays } from '@/app/utils/getGoalDays';
import { Button } from './ui/button';

const GoalList = () => {
	const setIsAddingGoalDayId = useGoalStore((state) => state.setIsAddingGoalDayId);
	const {
		data,
		isLoading,
		isError,
		isSuccess,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
		refetch,
	} = useInfiniteQuery<GetGoalDaysApiData>({
		queryKey: ['goalDays'],
		queryFn: getGoalDays,
		getNextPageParam: (lastPage, pages) => {
			return !lastPage.lastPage ? pages.length : undefined;
		},
	});

	const router = useRouter();

	// If a user has added the first goal and leaves page reset "isAddingGoalDayId".
	useEffect(() => {
		return () => setIsAddingGoalDayId(null);
	}, [router]);

	const todayHasGoals = !!data?.pages
		.flatMap((page) => [...(page?.goalDays || [])])
		?.some((goalDay: GoalDayType) => moment(new Date()).isSame(goalDay.createdAt, 'day'));

	if (data?.pages.some((page) => page.error) || isError)
		return (
			<div className="max-w-3xl mx-auto">
				<p className="leading-7 grow mt-4 text-center">Error loading goals</p>
			</div>
		);

	if (isLoading || !isSuccess) {
		return (
			<div className="max-w-3xl mx-auto">
				{Array.from({ length: 3 }).map((_, i) => (
					<GoalDaySkeleton key={`goal-day-skeleton-${i}`} index={i} />
				))}
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-center items-center gap-y-8 max-w-3xl mx-auto divide-y-4 divide-slate-300 dark:divide-slate-800">
			<Button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
				{isFetchingNextPage
					? 'Loading more...'
					: hasNextPage
					? 'Load Newer'
					: 'Nothing more to load'}
			</Button>
			{!todayHasGoals && isSuccess && <GoalDay goalDay={null} isFirst refetch={refetch} />}

			{data?.pages
				.flatMap((page) => [...(page?.goalDays || [])])
				?.sort((a, b) => moment.utc(b.createdAt).diff(moment.utc(a.createdAt)))
				?.map((goalDay, i) => (
					<GoalDay
						key={i}
						isFirst={i === 0 && todayHasGoals}
						goalDay={goalDay}
						refetch={refetch}
					/>
				))}
		</div>
	);
};

export default GoalList;
