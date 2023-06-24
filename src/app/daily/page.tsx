import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

const page = async () => {
	const session = await getServerSession(authOptions);

	if (!session) return notFound();

	return <div>Daily Goals Page</div>;
};

export default page;
