import { connectToDB } from '@/lib/db';
import { withMethods } from '@/lib/with-methods';
import GoalDay from '@/models/goalDay';
import { PostGoalDayApiData } from '@/types/goalDayApiData';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse<PostGoalDayApiData>) => {
	try {
		const user = await getServerSession(req, res, authOptions);

		if (!user) {
			return res.status(401).json({
				error: 'Unauthorized to perform this action.',
				goalDays: null,
			});
		}

		await connectToDB();

		const body = req.body;

		const goalDay = await GoalDay.create<PostGoalDayApiData>({});

		return res.status(200).json(goalDay);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues, goalDays: null });
		}

		return res.status(500).json({ error: 'Internal Server Error', goalDays: null });
	}
};

export default withMethods(['POST'], handler);
