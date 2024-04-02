"use server";
import { getIronSession } from "iron-session";
import {
  SessionData,
  defaultSession,
  sessionOptions,
} from "./cookieConfig";
import { cookies } from "next/headers";
import prisma from "./client";
import { permanentRedirect } from "next/navigation";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const getUserData = async (userId: string) => {
  const id = Number(userId);
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      userName: true,
      email: true,
    },
  });

  return user;
};

export const logOut = async () => {
  const session = await getSession();
  session.destroy();
  permanentRedirect("/login");
};
