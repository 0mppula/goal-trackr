export function getGoogleCredentials(): { clientId: string; clientSecret: string } {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
	if (!clientId || clientId.length === 0) {
		throw new Error('Missing GOOGLE_CLIENT_ID');
	}

	if (!clientSecret || clientSecret.length === 0) {
		throw new Error('Missing GOOGLE_CLIENT_SECRET');
	}

	return { clientId, clientSecret };
}
