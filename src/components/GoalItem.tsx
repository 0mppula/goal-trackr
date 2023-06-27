import { GoalType } from '@/types/goal';
import GaolItemControls from './GoalItemControls';

interface GoalItemProps {
	goal: GoalType;
	setEditedGoal: React.Dispatch<React.SetStateAction<GoalType | null>>;
}

const GoalItem = ({ goal, setEditedGoal }: GoalItemProps) => {
	return (
		<div className="flex gap-4 bg-slate-950 rounded-md p-4 [&:not(:first-child)]:mt-4 border-l-4 border-slate-800">
			<p key={goal._id} className="leading-7 grow">
				{goal.text}
			</p>

			<GaolItemControls setEditedGoal={setEditedGoal} goal={goal} />
		</div>
	);
};

export default GoalItem;
