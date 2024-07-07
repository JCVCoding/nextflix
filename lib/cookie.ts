import cookie from "cookie";
import { NextApiResponse } from "next";

const maxAge = 7 * 24 * 60 * 60;

export const setTokenCookie = (token: string, res: NextApiResponse) => {
  const setCookie = cookie.serialize("token", token, {
    maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.setHeader("Set-Cookie", setCookie);
};

export const removeTokenCookie = (res: NextApiResponse) => {
  const val = cookie.serialize("token", "", { maxAge: -1, path: "/" });
  res.setHeader("Set-Cookie", val);
};
