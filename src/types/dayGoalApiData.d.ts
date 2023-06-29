export interface GetDayGoalApiData {
	error: string | ZodIssue[] | null;
	dayGoals: DayGoalType | null;
}
