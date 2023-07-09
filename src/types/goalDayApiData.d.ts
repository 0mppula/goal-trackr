export interface GetGoalDaysApiData {
	error: string | ZodIssue[] | null;
	goalDays: GoalDayType[] | null;
	lastPage?: boolean;
}

export interface PostGoalDayApiData {
	error: string | ZodIssue[] | null;
	goalDay: GoalDayType | null;
}

export interface DeleteGoalDayApiData {
	error: string | ZodIssue[] | null;
}
