export interface GoalDayType {
	_id: string;
	goals: GoalType[];
	goalTarget?: number;
	createdAt: string;
	updatedAt: string;
}

export interface GoalType {
	_id: string;
	goalDayId: string;
	text: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
}
