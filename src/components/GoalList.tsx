'use client';
import { getGoalDays } from '@/app/daily/page';
import { GetGoalDaysApiData } from '@/types/goalDayApiData';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import GoalDay from './GoalDay';
import { GoalDayType } from '@/types/goal';

const GoalList = () => {
	const { data, isLoading } = useQuery<GetGoalDaysApiData>({
		queryKey: ['goalDays'],
		queryFn: getGoalDays,
	});

	if (isLoading) return <p>Loading...</p>;

	const todayHasGoals = !!data?.goalDays?.some((goalDay: GoalDayType) =>
		moment(new Date()).isSame(goalDay.createdAt, 'day')
	);

	return (
		<div className="flex flex-col justify-center items-center gap-y-8 max-w-3xl mx-auto divide-y-4 divide-slate-300 dark:divide-slate-800">
			{!todayHasGoals && <GoalDay goalDay={null} isFirst />}

			{data?.goalDays?.map((goalDay, i) => (
				<GoalDay key={i} isFirst={i === 0 && todayHasGoals} goalDay={goalDay} />
			))}
		</div>
	);
};

export default GoalList;
