export interface GoalDayType {
	_id: string;
	goals: GoalType[];
	goalTarget?: number;
	createdAt: string;
	updatedAt: string;
}

export interface GoalType {
	text: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
}
