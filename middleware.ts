// without matcher, this applies to the whole project
//export { default } from "next-auth/middleware"

import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {

      // outputs login info
      console.log("token?.name: ", token?.name);
      console.log("token?.email: ", token?.email);
      console.log("token?.userRole: ", token?.userRole);

      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.userRole === "admin"
      }
      // `/me` only requires the user to be logged in
      return !!token
    },
  },
})

// this would protect specific routes
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
// export const config = { matcher: ["/route1", "/route2"]};
