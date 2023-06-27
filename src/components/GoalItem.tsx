import { GoalType } from '@/types/goal';
import GaolItemControls from './GaolItemControls';

interface GoalItemProps {
	index: number;
	goal: GoalType;
}

const GoalItem = ({ goal, index }: GoalItemProps) => {
	return (
		<div className="flex gap-4 bg-slate-950 rounded-md p-4 [&:not(:first-child)]:mt-4 border-l-4 border-slate-800">
			<p key={goal._id} className="leading-7">
				{index + 1}. {goal.text}
			</p>

			<GaolItemControls />
		</div>
	);
};

export default GoalItem;
