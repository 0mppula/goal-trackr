import { GoalDayType } from '@/types/goal';
import moment from 'moment';
import GoalDayForm from './GoalDayForm';
import GoalItem from './GoalItem';
import { cn } from '@/lib/utils';

interface GoalDayProps {
	goalDay: GoalDayType | null;
	isFirst: boolean;
}

const GoalDay = ({ goalDay, isFirst }: GoalDayProps) => {
	const isToday = moment(new Date()).isSame(goalDay?.createdAt, 'day');

	return (
		<>
			<div className="w-full">
				<h2
					className={cn(
						'scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl',
						isFirst ? 'mt-0' : 'mt-8'
					)}
				>
					{goalDay && (
						<>
							{moment(goalDay?.createdAt).format('DD.MM.YY')} {isToday && '(Today)'}
						</>
					)}

					{!goalDay && <>{moment(new Date()).format('DD.MM.YY')} (Today)</>}
				</h2>

				{goalDay?.goals.map((goal) => (
					<GoalItem key={goal._id} goal={goal} />
				))}

				{!goalDay && (
					<p className="leading-7 grow mt-4">
						Create a new goal day to start tracking your goals.
					</p>
				)}

				{goalDay?.goals?.length === 0 && (
					<p className="leading-7 grow mt-4">This day does not have any goals yet. 🤔</p>
				)}

				<GoalDayForm goalDay={goalDay} />
			</div>
		</>
	);
};

export default GoalDay;
