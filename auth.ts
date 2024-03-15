import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/client";

const credentialsConfig = credentials({
  name: "Credentials",
  credentials: {
    email: {
      label: "Email",
      type: "email",
      placeholder: "Email",
    },
    password: {
      label: "Password",
      type: "password",
      placeholder: "Password",
    },
  },
  async authorize(credentials) {
    const user = await prisma.user.findFirst({
      where: {
        email: credentials?.email,
      },
    });
    if (!user) {
      throw new Error("Username is not correct");
    }

    if (!credentials?.password) {
      throw new Error("Please provide Your password");
    }
    // const isPasswordCorrect = await bcrypt.compare(
    //   credentials.password,
    //   user.password
    // );

    // if (!isPasswordCorrect) {
    //   throw new Error("Password is not correct");
    // }

    const { password, ...userWithoutPass } = user;
    return userWithoutPass;
  },
});

const config = {
  providers: [],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } =
  NextAuth(config);
