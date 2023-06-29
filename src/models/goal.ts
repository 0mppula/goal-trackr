import mongoose, { Schema, model, models } from 'mongoose';

const GoalSchema = new Schema(
	{
		goalDayId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'GoalDay',
		},
		text: {
			type: String,
			required: [true, 'A goal cannot be empty'],
		},
		completed: {
			type: Boolean,
		},
	},
	{ timestamps: true }
);

const Goal = models.GoalSchema || model('Goal', GoalSchema);

export default Goal;
