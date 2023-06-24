import mongoose from 'mongoose';
import { getMongoUri } from './auth';
import colors from 'colors';

let isConnected = false; // track the connection

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		console.log(colors.green('MongoDB is already connected'));
		return;
	}

	try {
		const conn = await mongoose.connect(getMongoUri(), {
			dbName: 'goal-stackr',
		});

		console.log(colors.cyan.underline(`MongoDB Connected: ${conn?.connection?.host}`));

		isConnected = true;
	} catch (error) {
		console.log(error);
	}
};
