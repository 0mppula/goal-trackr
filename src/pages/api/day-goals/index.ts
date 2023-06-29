import { connectToDB } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { GetDayGoalApiData } from '@/types/dayGoalApiData';
import GoalDay from '@/models/goalDay';
import { z } from 'zod';
import { GoalDayType } from '@/types/goal';

export const GET = async (req: NextApiRequest, res: NextApiResponse<GetDayGoalApiData>) => {
	try {
		const user = await getServerSession(req, res, authOptions);

		if (!user) {
			return res.status(401).json({
				error: 'Unauthorized to perform this action.',
				dayGoals: null,
			});
		}

		await connectToDB();

		const dayGoals = await GoalDay.find<GoalDayType>({ userId: user.user.id });

		return res.status(200).json({ error: null, dayGoals });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues, dayGoals: null });
		}

		return res.status(500).json({ error: 'Internal Server Error', dayGoals: null });
	}
};

export default GET;
