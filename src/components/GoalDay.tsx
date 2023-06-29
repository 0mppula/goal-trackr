import { GoalDayType } from '@/types/goal';
import moment from 'moment';
import GoalDayForm from './GoalDayForm';
import GoalItem from './GoalItem';

interface GoalDayProps {
	goalDay: GoalDayType;
}

const GoalDay = ({ goalDay }: GoalDayProps) => {
	return (
		<>
			<div className="w-full">
				<h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mt-8">
					{moment(goalDay.createdAt).format('DD.MM.YY')} (Today)
				</h2>

				{goalDay.goals.map((goal, i) => (
					<GoalItem key={`${goalDay._id}-${i}`} goal={goal} />
				))}

				<GoalDayForm />
			</div>
		</>
	);
};

export default GoalDay;
