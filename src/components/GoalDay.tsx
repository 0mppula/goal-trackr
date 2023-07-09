import { cn } from '@/lib/utils';
import { GoalDayType } from '@/types/goal';
import moment from 'moment';
import GoalDayForm from './GoalDayForm';
import GoalItem from './GoalItem';
import {
	RefetchOptions,
	InfiniteData,
	QueryObserverResult,
	RefetchQueryFilters,
} from '@tanstack/react-query';
import { GetGoalDaysApiData } from '@/types/goalDayApiData';

interface GoalDayProps {
	goalDay: GoalDayType | null;
	isFirst: boolean;
	refetch: <TPageData>(
		options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
	) => Promise<QueryObserverResult<InfiniteData<GetGoalDaysApiData>, unknown>>;
}

const GoalDay = ({ goalDay, isFirst, refetch }: GoalDayProps) => {
	const isToday = moment(new Date()).isSame(goalDay?.createdAt, 'day');

	return (
		<>
			<div className="w-full">
				<div className="flex items-end justify-between">
					<h2
						className={cn(
							'scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl',
							isFirst ? 'mt-0' : 'mt-8'
						)}
					>
						{goalDay && (
							<>
								{moment(goalDay?.createdAt).format('DD.MM.YY')}{' '}
								{isToday && '(Today)'}
							</>
						)}

						{!goalDay && <>{moment(new Date()).format('DD.MM.YY')} (Today)</>}
					</h2>

					{goalDay && <p className="leading-7">{goalDay?.goals?.length} Goals</p>}
				</div>

				{goalDay?.goals
					.sort((a, b) => moment.utc(a.createdAt).diff(moment.utc(b.createdAt)))
					.map((goal, i) => (
						<GoalItem key={goal._id} goalDay={goalDay} goal={goal} listIndex={i} />
					))}

				{(goalDay?.goals?.length === 0 || !goalDay) && (
					<p className="leading-7 grow mt-4">No goals for this day. 🤔</p>
				)}

				<GoalDayForm goalDay={goalDay} refetch={refetch} />
			</div>
		</>
	);
};

export default GoalDay;
