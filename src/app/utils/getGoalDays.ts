import { GetGoalDaysApiData } from '@/types/goalDayApiData';

export const getGoalDays = async () => {
	const goals: GetGoalDaysApiData = await fetch('/api/day-goals/get').then((res) => res.json());

	return goals;
};
