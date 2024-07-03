// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { magicAdmin } from "@/lib/magic-server";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { isNewUser, createNewUser } from "@/lib/db/hasura";
import { setTokenCookie } from "@/lib/cookie";

type Data = {
  done?: boolean;
  isNewUserQuery?: any;
  msg?: string;
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;

      const didToken = auth ? auth.substring(7) : "";

      const metaData = await magicAdmin.users.getMetadataByToken(didToken);

      const iat = Math.floor(Date.now() / 1000);

      const token = jwt.sign(
        {
          ...metaData,
          iat,
          exp: Math.floor(iat + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metaData.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );
      const isNewUserQuery = await isNewUser(token, metaData.issuer);
      isNewUserQuery && (await createNewUser(token, metaData));
      setTokenCookie(token, res);
      res.send({ done: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}
