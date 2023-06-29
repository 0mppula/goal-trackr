import mongoose, { Schema, model, models } from 'mongoose';
import Goal from './goal';

const GoalDaySchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		goals: {
			type: [Goal],
		},
		goalTarget: {
			type: Number,
		},
	},
	{ timestamps: true }
);

const GoalDay = models.GoalDaySchema || model('GoalDay', GoalDaySchema);

export default GoalDay;
