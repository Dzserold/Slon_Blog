import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "Auth_Session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
};

export interface SessionData {
  userId?: string;
  email?: string;
  userName?: string;
  isLoggedIn: boolean;

  //   isBlocked?: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};
