// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { magicAdmin } from "@/lib/magic-server";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { isNewUser, createNewUser } from "@/lib/db/hasura";

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
      if (isNewUserQuery) {
        const createNewUserMutation = await createNewUser(token, metaData);
        console.log(createNewUserMutation);
        res.send({ done: true, msg: "is a new user" });
      } else {
        res.status(200).json({ done: true, msg: "not a new user" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}
