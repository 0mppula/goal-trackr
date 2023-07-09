import { connectToDB } from '@/lib/db';
import { withMethods } from '@/lib/with-methods';
import GoalDay from '@/models/goalDay';
import { GoalDayType } from '@/types/goal';
import { GetGoalDaysApiData } from '@/types/goalDayApiData';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse<GetGoalDaysApiData>) => {
	const cursor = req.query.cursor || 0;
	const pageSize = 2;
	const parsedCursor = parseInt(String(cursor), 10) || 0;

	try {
		const user = await getServerSession(req, res, authOptions);

		if (!user) {
			return res.status(401).json({
				error: 'Unauthorized to perform this action.',
				goalDays: null,
			});
		}

		await connectToDB();

		const totalGoals = await GoalDay.countDocuments({ userId: user.user.id });

		const goalDays = await GoalDay.find<GoalDayType>({ userId: user.user.id })
			.sort({
				createdAt: -1,
			})
			.skip(parsedCursor * pageSize)
			.limit(pageSize);

		return res.status(200).json({
			error: null,
			goalDays,
			lastPage: !(totalGoals >= parsedCursor * pageSize + pageSize),
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues, goalDays: null });
		}

		return res.status(500).json({ error: 'Internal Server Error', goalDays: null });
	}
};

export default withMethods(['GET'], handler);
