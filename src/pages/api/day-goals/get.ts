import { connectToDB } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { GetGoalDaysApiData } from '@/types/goalDayApiData';
import GoalDay from '@/models/goalDay';
import { z } from 'zod';
import { GoalDayType } from '@/types/goal';
import { withMethods } from '@/lib/with-methods';

export const handler = async (req: NextApiRequest, res: NextApiResponse<GetGoalDaysApiData>) => {
	try {
		const user = await getServerSession(req, res, authOptions);

		console.log('first');

		if (!user) {
			return res.status(401).json({
				error: 'Unauthorized to perform this action.',
				goalDays: null,
			});
		}

		await connectToDB();

		const goalDays = await GoalDay.find<GoalDayType>({ userId: user.user.id });

		return res.status(200).json({ error: null, goalDays });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues, goalDays: null });
		}

		return res.status(500).json({ error: 'Internal Server Error', goalDays: null });
	}
};

export default withMethods(['GET'], handler);
