import { connectToDB } from '@/lib/db';
import { withMethods } from '@/lib/with-methods';
import GoalDay from '@/models/goalDay';
import { PostGoalDayApiData } from '@/types/goalDayApiData';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '../../auth/[...nextauth]';
import { GoalDayType } from '@/types/goal';

const handler = async (req: NextApiRequest, res: NextApiResponse<PostGoalDayApiData>) => {
	try {
		const user = await getServerSession(req, res, authOptions);

		if (!user) {
			return res.status(401).json({
				error: 'Unauthorized to perform this action.',
				goalDay: null,
			});
		}

		await connectToDB();

		const { id: goalDayId } = req.query;
		const { newGoalDay: goalDayParam } = req.body;

		const goalDay: GoalDayType | null = await GoalDay.findById(goalDayId);

		if (!goalDay) {
			return res.status(401).json({
				error: 'Goal day does not exist',
				goalDay: null,
			});
		}

		const newGoalDay: GoalDayType | null = await GoalDay.findByIdAndUpdate(
			goalDayId,
			goalDayParam
		);

		return res.status(200).json({ error: null, goalDay: newGoalDay });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues, goalDay: null });
		}

		return res.status(500).json({ error: 'Internal Server Error', goalDay: null });
	}
};

export default withMethods(['PATCH'], handler);
