export const metadata = {
	title: 'Daily Goals – GoalStackr',
	description: 'A free goal tracking application',
};

const layout = ({ children }: { children: React.ReactNode }) => {
	return <div className="py-20">{children}</div>;
};

export default layout;
