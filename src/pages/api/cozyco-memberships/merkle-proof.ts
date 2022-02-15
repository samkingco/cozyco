import { memberships } from "@cozy/tokens/cozyco-memberships";
import keccak256 from "keccak256";
import { NextApiRequest, NextApiResponse } from "next";

export interface GetMerkleProofResponse {
  proof: string[];
  root: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetMerkleProofResponse>
) => {
  const address = req.query.address as string;
  const proof = memberships.friendsOf.merkleTree.getHexProof(
    keccak256(address)
  );
  res.json({ proof, root: memberships.friendsOf.merkleTree.getHexRoot() });
};

export default handler;
