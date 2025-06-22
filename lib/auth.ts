import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import prisma from "./prismaClient";

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                name: { label: "Name", type: "text" },
                password: { label: "Password", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const user = await prisma.user.findFirst({ where: { email: credentials.email } });

                    if (!user) return null;

                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password as string);

                    if (!isPasswordValid) return null;

                    return {
                        id: user.id.toString(),
                        email: user.email,
                        name: user.name,
                        image: user.image
                    };
                } catch (error) {
                    console.error(`Internal server error while signing in : ${error}`);
                }
                return null;
            },
        })
    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin"
    },
    callbacks: {
        async signIn({ user, account }) {
            const existingUser = await prisma.user.findFirst({ where: { email: user.email as string } });

            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        email: user.email as string,
                        name: user.name as string,
                        provider: account?.provider || "Google",
                    }
                });
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.picture = user.image;
                token.name = user.name;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.name = token.name;
            }

            return session;
        }
    }
}

const getSession = () => getServerSession(authOptions);

export { getSession, authOptions }