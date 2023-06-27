'use client';
import { GoalDayType, GoalType } from '@/types/goal';
import moment from 'moment';
import React, { useState } from 'react';
import GoalItem from './GoalItem';
import GoalDayForm from './GoalDayForm';

interface GoalDayProps {
	goalDay: GoalDayType;
}

const GoalDay = ({ goalDay }: GoalDayProps) => {
	const [editedGoal, setEditedGoal] = useState<null | GoalType>(null);

	return (
		<>
			<div className="w-full">
				<h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mt-8">
					{moment(goalDay.createdAt).format('DD.MM.YY')} (Today)
				</h2>

				{goalDay.goals.map((goal) => (
					<GoalItem key={goal._id} goal={goal} setEditedGoal={setEditedGoal} />
				))}

				<GoalDayForm editedGoal={editedGoal} setEditedGoal={setEditedGoal} />
			</div>
		</>
	);
};

export default GoalDay;
