'use client';
import { cn } from '@/lib/utils';
import { GoalDayType, GoalType } from '@/types/goal';
import { useState } from 'react';
import GoalEditForm from './GoalEditForm';
import GoalItemControls from './GoalItemControls';

interface GoalItemProps {
	goalDay: GoalDayType;
	goal: GoalType;
}

const GoalItem = ({ goalDay, goal }: GoalItemProps) => {
	const [editingGoal, setEditingGoal] = useState(false);

	return (
		<>
			<div
				className={cn(
					'flex gap-4 dark:bg-slate-950 bg-white rounded-md p-4 mt-4 border-l-4 border-slate-800 dark:border-slate-200',
					editingGoal &&
						'bg-slate-300 dark:bg-slate-800 border-yellow-700 dark:border-yellow-300'
				)}
			>
				<p className="leading-7 grow self-center">{goal.text}</p>

				<GoalItemControls setEditingGoal={setEditingGoal} goalDay={goalDay} goal={goal} />
			</div>

			<GoalEditForm
				goalDay={goalDay}
				editingGoal={editingGoal}
				setEditingGoal={setEditingGoal}
				goal={goal}
			/>
		</>
	);
};

export default GoalItem;
