'use client';
import { getGoalDays } from '@/app/daily/page';
import { GoalDayType } from '@/types/goal';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import GoalDay from './GoalDay';
import { GetGoalDaysApiData } from '@/types/goalDayApiData';

const GoalList = () => {
	const { data, isLoading } = useQuery<GetGoalDaysApiData>({
		queryKey: ['goalDays'],
		queryFn: getGoalDays,
	});

	if (isLoading) return <p>Loading...</p>;

	return (
		<div className="flex flex-col justify-center items-center gap-y-8 max-w-3xl mx-auto divide-y-4 divide-slate-800">
			{data?.goalDays
				?.sort((a: GoalDayType, b: GoalDayType) =>
					moment.utc(a.createdAt).diff(moment.utc(b.createdAt))
				)
				?.map((goalDay: GoalDayType, i: number) => (
					<GoalDay key={i} isFirst={i === 0} goalDay={goalDay} />
				))}
		</div>
	);
};

export default GoalList;
