import { memberships } from "@cozy/tokens/cozyco-memberships";
import { isValidAddress, resolveAddress } from "@cozy/utils/eth";
import { NextApiRequest, NextApiResponse } from "next";

export interface MemberListCheckResponse {
  isOnList: boolean;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MemberListCheckResponse>
) => {
  const address = req.query.address as string;
  if (!isValidAddress(address)) {
    throw new Error("Invalid wallet address");
  }
  const resolvedAddress = await resolveAddress(address);
  const isOnList = resolvedAddress
    ? memberships.friendsOf.list.includes(resolvedAddress.toLowerCase())
    : false;

  res.json({ isOnList });
};

export default handler;
