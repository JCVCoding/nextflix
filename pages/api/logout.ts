import { magicAdmin } from "@/lib/magic-server";
import { verifyToken } from "@/lib/utils";
import { removeTokenCookie } from "@/lib/cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.cookies.token;
    if (token) {
      const userId = await verifyToken(token);
      removeTokenCookie(res);

      try {
        await magicAdmin.users.logoutByIssuer(userId!);
      } catch (error) {
        console.error(
          "Error occurred while logging out user with magic",
          error
        );
      }

      res.writeHead(302, { location: "/login" });
      res.end();
    } else {
      return res.status(401).send({ message: "User is not logged in" });
    }
  } catch (error) {
    console.error({ error });
    res.status(401).json({ error });
  }
}
