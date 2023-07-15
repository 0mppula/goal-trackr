# GoalTrackr

## What is GoalTrackr?

GoalTrackr is a fullstack Next.js 13 application created using the [shadcn/ui][chad] library. The app allows authenticated users to list and track their daily goals.

Global state is managed with [Zustand][Zustand], database queries are done using [TanStack Query][TanStack Query] and authentication is managed with NextAuth.js.

Additionally, some routes are protected from unauthorized users. Users are redirected to the daily goals page after initial authentication.

User and app data is saved to a MongoDB data base.

Check out the [live][live] version of this app.

[live]: https://goaltrackr.vercel.app/
[TanStack Query]: https://tanstack.com/query/
[Zustand]: https://www.npmjs.com/package/zustand
[NextAuth]: https://next-auth.js.org/
[chad]: https://ui.shadcn.com/
