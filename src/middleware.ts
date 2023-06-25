import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
	async function middleware(req: NextRequest) {
		const token = await getToken({ req });
		const isAuth = !!token;
		const isAuthPage = req.nextUrl.pathname.startsWith('/login');
		const pathname = req.nextUrl.pathname;

		const sensitivePaths = ['/daily'];

		// If the an authenticated user is trying to access the "login" page redirect to "daily" the
		// page.
		if (isAuthPage) {
			if (isAuth) {
				return NextResponse.redirect(new URL('/daily', req.url));
			}
			return null;
		}

		// If the an un authenticated user is trying to access a sensitive pathname redirect to the
		// "login" page.
		if (!isAuth && sensitivePaths.some((route) => pathname.startsWith(route))) {
			return NextResponse.redirect(new URL('/login', req.url));
		}
	},
	{
		callbacks: {
			async authorized() {
				// This is a work-around for handling redirect on auth pages.
				// We return true here so that the middleware function above
				// is always called.
				return true;
			},
		},
	}
);

export const config = {
	matcher: ['/', '/login', '/daily'],
};
