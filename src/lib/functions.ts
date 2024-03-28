"use server";
import { getIronSession } from "iron-session";
import {
  SessionData,
  defaultSession,
  sessionOptions,
} from "./cookieConfig";
import { cookies } from "next/headers";
import prisma from "./client";

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
  });

  const data = {
    id: user?.id,
    userName: user?.userName,
    email: user?.email,
  };

  return data;
};
