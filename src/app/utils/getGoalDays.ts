import { GetGoalDaysApiData } from '@/types/goalDayApiData';

export const getGoalDays = async ({ pageParam = 0 }) => {
	const goals: GetGoalDaysApiData = await fetch(`/api/day-goals/get?cursor=${pageParam}`).then(
		(res) => res.json()
	);

	return goals;
};
