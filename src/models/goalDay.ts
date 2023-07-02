import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema(
	{
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

const GoalDaySchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		goals: [GoalSchema],
		goalTarget: {
			type: Number,
		},
	},
	{ timestamps: true }
);

const GoalDay = mongoose.models.Goal_Day || mongoose.model('Goal_Day', GoalDaySchema);

export default GoalDay;
