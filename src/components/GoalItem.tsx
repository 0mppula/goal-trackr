'use client';
import { cn } from '@/lib/utils';
import { GoalType } from '@/types/goal';
import { useState } from 'react';
import GoalEditForm from './GoalEditForm';
import GaolItemControls from './GoalItemControls';

interface GoalItemProps {
	goal: GoalType;
}

const GoalItem = ({ goal }: GoalItemProps) => {
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

				<GaolItemControls setEditingGoal={setEditingGoal} goal={goal} />
			</div>

			<GoalEditForm editingGoal={editingGoal} setEditingGoal={setEditingGoal} goal={goal} />
		</>
	);
};

export default GoalItem;
