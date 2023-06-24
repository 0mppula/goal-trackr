import LandingPage from '@/components/LandingPage';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<div className="h-screen container">{session ? <h1>Welcome!</h1> : <LandingPage />}</div>
	);
}
