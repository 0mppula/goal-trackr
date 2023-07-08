'use client';
import { cn } from '@/lib/utils';
import useGoalStore from '@/store/useGoalStore';
import { GoalDayType, GoalType } from '@/types/goal';
import GoalEditForm from './GoalEditForm';
import GoalItemControls from './GoalItemControls';

interface GoalItemProps {
	goalDay: GoalDayType;
	goal: GoalType;
	listIndex: number;
}

const GoalItem = ({ goalDay, goal, listIndex }: GoalItemProps) => {
	const editedGoalId = useGoalStore((state) => state.editedGoalId);

	return (
		<>
			<div
				className={cn(
					'flex gap-4 dark:bg-slate-950 bg-white rounded-md p-4 mt-4 border-l-4 border-slate-800 dark:border-slate-200',
					editedGoalId === goal._id &&
						'bg-slate-300 dark:bg-slate-800 border-yellow-700 dark:border-yellow-300'
				)}
			>
				<p
					className={cn(
						'leading-7 grow self-center relative',
						listIndex + 1 >= 10 ? 'pl-8' : 'pl-6'
					)}
				>
					<span className="absolute top-0 left-0">{listIndex + 1}.</span> {goal.text}
				</p>

				<GoalItemControls goalDay={goalDay} goal={goal} />
			</div>

			<GoalEditForm goalDay={goalDay} goal={goal} />
		</>
	);
};

export default GoalItem;
