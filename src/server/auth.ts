import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/server/db/prisma";

import { loginSchema } from "@/server/schemas/auth/auth.schema";
import { ZodError } from "zod";

import { findUserByEmail } from "./services/user.service";
import checkPasswords from "./utils/check-password";

import { invalid_credentials } from "@/server/schemas/auth/auth.error";

const options: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const data = loginSchema.parse({
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = await findUserByEmail(data.email);

          if (!user) {
            throw new Error(invalid_credentials);
          }

          if (!user.password) {
            throw new Error(
              "This user has been registered using an Auth Provider, please sign in using that provider"
            );
          }

          const valid = await checkPasswords(user.password, data.password);

          if (!valid) {
            throw new Error(invalid_credentials);
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            throw new Error(invalid_credentials);
          }
          throw new Error(invalid_credentials);
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

export default options;
