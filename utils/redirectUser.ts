import { verifyToken } from "@/lib/utils";
import { GetServerSidePropsContext } from "next";

const redirectUser = async (context: GetServerSidePropsContext) => {
  const token = context.req ? context.req?.cookies.token! : null;
  const userId = await verifyToken(token);

  return { userId, token };
};

export default redirectUser;
