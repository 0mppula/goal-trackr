# GoalTrackr

## What is GoalTrackr?

GoalTrackr is a fullstack Next.js 13 application allowing authenticated users to list and track their daily goals.

The application supports optimistic rendering with [TanStack Query][1] and manages global state with [Zustand][2].

Authentication is done with [NextAuth.js][3]. Additionally, some routes are protected from unauthorized users and users are redirected to the daily goals page after initial authentication.

User and goals data are saved to a MongoDB data base.

The UI library used in this app: [shadcn/ui][chad]

Check out the [live][0] version of this app.

[0]: https://goaltrackr.vercel.app/
[1]: https://tanstack.com/query/
[2]: https://www.npmjs.com/package/zustand
[3]: https://next-auth.js.org/
[chad]: https://ui.shadcn.com/
