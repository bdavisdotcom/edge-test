import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

export type Session = {
  id: number;
  email: string;
  type: string;
  iat: number;
  exp: number;
};

export function getToken(cookieHeader?: string): string | undefined {
  const cookies = new Cookies(cookieHeader ?? null, { path: "/" });
  return cookies.get("session");
}

export function createSession(token: string, cookieHeader?: string) {
  const cookies = new Cookies(cookieHeader ?? null, { path: "/" });

  const { exp } = jwtDecode<Session>(token);
  const expiresAt = new Date(Number(`${exp}000`));

  cookies.set("session", token, {
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

