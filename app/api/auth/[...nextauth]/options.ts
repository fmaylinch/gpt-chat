import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials" 

export const authOptions: NextAuthOptions = {
    providers: [
        //GitHubProvider({
        //    clientId: process.env.GITHUB_ID as string,
        //    clientSecret: process.env.GITHUB_SECRET as string,
        //}),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "your-username",
                },
                password: {
                    label: "Password",
                    type: "text"
                },
            },
            async authorize(credentials) {
                // TODO - check with database
                // https://next-auth.js.org/configuration/providers/credentials
                const user = { id: "1", name: "fake-user", password: "fake-pass" }

                // loging by GitHub we don't get here
                // TODO - I have to check the username somewhere else

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user;
                } else {
                    return null;
                }
            }
        }),
    ],
}
