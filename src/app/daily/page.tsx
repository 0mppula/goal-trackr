import GoalDay from '@/components/GoalDay';
import goalDays from '@/data/mockGoals.json';
import moment from 'moment';

const page = () => {
	return (
		<div className="container pt-8">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-8">
				My Daily Goals
			</h1>

			<div className="flex flex-col justify-center items-center gap-y-8 max-w-3xl mx-auto divide-y-4 divide-slate-800">
				{goalDays
					.sort((a, b) => moment.utc(a.createdAt).diff(moment.utc(b.createdAt)))
					.map((goalDay, i) => (
						<GoalDay key={i} goalDay={goalDay} />
					))}
			</div>
		</div>
	);
};

export default page;
