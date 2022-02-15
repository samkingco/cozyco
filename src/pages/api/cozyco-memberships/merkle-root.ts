import { memberships } from "@cozy/tokens/cozyco-memberships";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  res.json({ root: memberships.friendsOf.merkleTree.getHexRoot() });
};

export default handler;
