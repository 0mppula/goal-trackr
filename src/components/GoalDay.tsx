import { GoalDayType } from '@/types/goal';
import moment from 'moment';
import React from 'react';
import GoalItem from './GoalItem';
import GoalDayForm from './GoalDayForm';

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

				{goalDay.goals.map((goal, index) => (
					<GoalItem key={goal._id} goal={goal} index={index} />
				))}

				<GoalDayForm />
			</div>
		</>
	);
};

export default GoalDay;
