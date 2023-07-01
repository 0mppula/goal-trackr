import { GoalDayType } from '@/types/goal';
import moment from 'moment';
import GoalDayForm from './GoalDayForm';
import GoalItem from './GoalItem';
import { cn } from '@/lib/utils';

interface GoalDayProps {
	goalDay: GoalDayType;
	isFirst: boolean;
}

const GoalDay = ({ goalDay, isFirst }: GoalDayProps) => {
	return (
		<>
			<div className="w-full">
				<h2
					className={cn(
						'scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl',
						isFirst ? 'mt-0' : 'mt-8'
					)}
				>
					{moment(goalDay.createdAt).format('DD.MM.YY')} (Today)
				</h2>

				{goalDay.goals.map((goal) => (
					<GoalItem key={goal._id} goal={goal} />
				))}

				<GoalDayForm />
			</div>
		</>
	);
};

export default GoalDay;
