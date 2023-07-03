import { connectToDB } from '@/lib/db';
import { withMethods } from '@/lib/with-methods';
import GoalDay from '@/models/goalDay';
import { GoalDayType } from '@/types/goal';
import { DeleteGoalDayApiData } from '@/types/goalDayApiData';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '../../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse<DeleteGoalDayApiData>) => {
	try {
		const user = await getServerSession(req, res, authOptions);

		if (!user) {
			return res.status(401).json({
				error: 'Unauthorized to perform this action.',
			});
		}

		await connectToDB();

		const { id: goalDayId } = req.query;
		const { goalId } = req.body;

		const goalDay: GoalDayType | null = await GoalDay.findById(goalDayId);

		if (!goalDay) {
			return res.status(401).json({
				error: 'Goal day does not exist',
			});
		}

		await GoalDay.updateOne({ _id: goalDayId }, { $pull: { goals: { _id: goalId } } });

		return res.status(200).json({ error: null });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({ error: error.issues });
		}

		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

export default withMethods(['POST'], handler);
