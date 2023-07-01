export interface GetGoalDaysApiData {
	error: string | ZodIssue[] | null;
	goalDays: GoalDayType | null;
}
