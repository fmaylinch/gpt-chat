import NextAuth from "next-auth/next";
import { authOptions } from './options'

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }


/*
I had this, but it produced log errors, since I added SessionProvider in layout.tsx
// see https://github.com/vercel-labs/ai-chatbot/blob/main/auth.ts
export const {
    handlers: { GET, POST },
    auth,
    CSRF_experimental // will be removed in future
  } = NextAuth(authOptions);
*/