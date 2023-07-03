import { cn } from '@/lib/utils';
import { GoalDayType } from '@/types/goal';
import moment from 'moment';
import GoalDayForm from './GoalDayForm';
import GoalItem from './GoalItem';

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

				{goalDay?.goals
					.sort((a, b) => moment.utc(a.createdAt).diff(moment.utc(b.createdAt)))
					.map((goal) => (
						<GoalItem key={goal._id} goal={goal} />
					))}

				{(goalDay?.goals?.length === 0 || !goalDay) && (
					<p className="leading-7 grow mt-4">No goals for this day. 🤔</p>
				)}

				<GoalDayForm goalDay={goalDay} />
			</div>
		</>
	);
};

export default GoalDay;
