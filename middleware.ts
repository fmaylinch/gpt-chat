// without matcher, this applies to the whole project
export { default } from "next-auth/middleware"

// this would protect specific routes
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
// export const config = { matcher: ["/route1", "/route2"]};
