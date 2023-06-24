import mongoose from 'mongoose';
import { getMongoUri } from './auth';
import colors from 'colors';

let isConnected = false; // track the connection

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (true) {
		console.log('MongoDB is already connected');
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
