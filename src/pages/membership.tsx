import { Button } from "@cozy/components/Button";
import { LoadingIndicator } from "@cozy/components/LoadingIndicator";
import { MaxWidthWrapper } from "@cozy/components/MaxWidthWrapper";
import { PageContent } from "@cozy/components/PageContent";
import { PageTitle } from "@cozy/components/PageTitle";
import { H2, Paragraph } from "@cozy/components/Typography";
import { connectOptions } from "@cozy/utils/connectOptions";
import {
  contractAbi,
  contractAddress,
  isChainSupportedForContract,
} from "@cozy/utils/deployedContracts";
import { fetcher } from "@cozy/utils/fetch";
import { useWallet } from "@gimmixorg/use-wallet";
import { BigNumber, Contract, ethers } from "ethers";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { MemberListCheckResponse } from "./api/cozyco-memberships/check-list";
import { GetMerkleProofResponse } from "./api/cozyco-memberships/merkle-proof";

const ActionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: ${(p) => p.theme.colors.bgMuted};
  border-radius: 8px;
  margin-top: 24px;
  text-align: center;

  @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
    padding: 32px;
  }
`;

const SubCard = styled(ActionCard)`
  background: ${(p) => p.theme.colors.bgStrong};
  text-align: left;
`;

enum MintingState {
  NOT_READY = "NOT_READY",
  NOT_CONNECTED = "NOT_CONNECTED",
  WRONG_NETWORK = "WRONG_NETWORK",
  ALREADY_CLAIMED = "ALREADY_CLAIMED",
  READY = "READY",
  WAITING = "WAITING",
  ERROR = "ERROR",
  BROADCASTED = "BROADCASTED",
  CONFIRMED = "CONFIRMED",
}

enum MembershipType {
  FRIEND_OF = 1,
}

export default function Membership() {
  const { account, provider, connect, network } = useWallet();
  const [mintingState, setMintingState] = useState<MintingState>(
    MintingState.NOT_READY
  );

  let contract: Contract | undefined;

  if (
    provider &&
    network &&
    isChainSupportedForContract("cozyCoMembership", network.chainId)
  ) {
    contract = new ethers.Contract(
      contractAddress("cozyCoMembership", network.chainId),
      contractAbi("cozyCoMembership"),
      provider
    );
  }

  const [balance, setBalance] = useState(0);

  const { data: merkleProof } = useSWR<GetMerkleProofResponse>(
    account ? `/api/cozyco-memberships/merkle-proof?address=${account}` : null,
    fetcher
  );

  const { data: checkList } = useSWR<MemberListCheckResponse>(
    account ? `/api/cozyco-memberships/check-list?address=${account}` : null,
    fetcher
  );

  // Set state of minting
  useEffect(() => {
    // No account connected
    if (!account) {
      setMintingState(MintingState.NOT_CONNECTED);
      return;
    }

    // Wrong network connected
    if (
      network &&
      !isChainSupportedForContract("cozyCoMembership", network.chainId)
    ) {
      setMintingState(MintingState.WRONG_NETWORK);
      return;
    }

    // Check balances of membership contract
    if (contract) {
      setMintingState(MintingState.NOT_READY);
      contract
        .balanceOf(account, MembershipType.FRIEND_OF)
        .then((balanceOfFriendsToken: BigNumber) => {
          setBalance(balanceOfFriendsToken.toNumber());
          if (balanceOfFriendsToken.toNumber() > 0) {
            setMintingState(MintingState.ALREADY_CLAIMED);
          } else {
            setMintingState(MintingState.READY);
          }
        })
        .catch((e: any) => {
          console.error(e);
        });
    }
  }, [account, network]);

  // When the mint button is pressed
  const handleMint = useCallback(async () => {
    if (!account) {
      setMintingState(MintingState.NOT_CONNECTED);
      connect(connectOptions);
      return;
    }
    if (!contract || !merkleProof) {
      setMintingState(MintingState.NOT_READY);
      return;
    }
    if (mintingState === MintingState.ERROR) {
      setMintingState(MintingState.READY);
    }
    if (
      ![MintingState.READY, MintingState.ERROR].includes(mintingState as any)
    ) {
      return;
    }

    try {
      setMintingState(MintingState.WAITING);
      const tx = await contract.joinCozyCo(
        merkleProof.proof,
        MembershipType.FRIEND_OF
      );
      setMintingState(MintingState.BROADCASTED);
      await tx.wait();
      setMintingState(MintingState.CONFIRMED);
    } catch (e: any) {
      console.error(e);
      setMintingState(MintingState.ERROR);
    }
  }, [mintingState, merkleProof]);

  const metaTitle = "membership • cozy co.";
  const metaDescription =
    "a very limited number of special membership cards are available… become a friend of cozy co.";
  const metaImage = "https://cozyco.studio/og-image-join-active.png";

  return (
    <PageContent>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </Head>

      <MaxWidthWrapper as="section">
        <PageTitle title="Membership" quilty="wink" />

        <Paragraph>
          To celebrate the formation of cozy co, the Quilt Stitcher has released
          a very limited number of special cards. Each card gives the holder
          exclusive access and discounts on cozy wares.
        </Paragraph>
        <Paragraph margin="12 0 0">
          Memberships are free to mint, only costing a small gas fee. If gas is
          too high, DM us on Twitter or Discord and we can mint it on your
          behalf.
        </Paragraph>

        <ActionCard>
          {mintingState === MintingState.NOT_CONNECTED && (
            <>
              <Button onClick={handleMint}>check eligibility</Button>
            </>
          )}

          {mintingState === MintingState.NOT_READY && <LoadingIndicator />}

          {mintingState === MintingState.WRONG_NETWORK && (
            <Paragraph size="s">
              Connected to the wrong ethereum network. Please use mainnet or
              rinkeby.
            </Paragraph>
          )}

          {mintingState === MintingState.ALREADY_CLAIMED && (
            <>
              <H2 size="m">You’re already a member!</H2>
              <Paragraph size="s" margin="8 0 0">
                Check out the <a href="/s/twitter">Twitter</a> and{" "}
                <a href="/s/discord">Discord</a> to know when the next drop
                happens.
              </Paragraph>
            </>
          )}

          {mintingState === MintingState.READY && !checkList && (
            <LoadingIndicator />
          )}

          {mintingState === MintingState.READY &&
            checkList &&
            !checkList.isOnList && (
              <>
                <H2 size="m">Sadly you're not on the list</H2>
                <Paragraph size="s" margin="8 0 0">
                  The initial round of memberships were only for people who
                  filled out a form, and held at least one quilt at the time of
                  a snapshot. Read below for more info.
                </Paragraph>
              </>
            )}

          {checkList && checkList.isOnList && balance === 0 && (
            <>
              {(mintingState === MintingState.READY ||
                mintingState === MintingState.ERROR ||
                mintingState === MintingState.WAITING) && (
                <>
                  <H2 size="m">You’re on the list!</H2>
                  <Paragraph size="s" margin="8 0 16">
                    You can claim your membership card. It’s free, you’ll just
                    pay for gas. There’s also no time limit so feel free to
                    claim when it suits you. It will be here when you’re ready.
                  </Paragraph>
                  <Button
                    onClick={handleMint}
                    disabled={mintingState === MintingState.WAITING}
                  >
                    claim membership card
                  </Button>
                  {mintingState === MintingState.ERROR && (
                    <Paragraph size="s" margin="8 0 0">
                      Something went wrong. You can try again, but reach out if
                      the problem continues.
                    </Paragraph>
                  )}
                </>
              )}

              {mintingState === MintingState.BROADCASTED && (
                <>
                  <H2 size="m">Welcome to cozy co!</H2>
                  <Paragraph size="s" margin="8 0 0">
                    Now we wait for ethereum to do it’s thing. Your membership
                    card should be with you soon. Feel free to close this page
                    and check your wallet later.
                  </Paragraph>
                </>
              )}

              {mintingState === MintingState.CONFIRMED && (
                <>
                  <H2 size="m">Welcome to cozy co!</H2>
                  <Paragraph size="s" margin="8 0 0">
                    Check out the <a href="/s/twitter">Twitter</a> and{" "}
                    <a href="/s/discord">Discord</a> to know when the next drop
                    happens.
                  </Paragraph>
                </>
              )}
            </>
          )}
        </ActionCard>

        <SubCard>
          <Paragraph size="s">
            These cards were only available to a small group of Quilt NFT
            holders, so you may have missed out for now. There will likely be
            other types of membership cards in the future for upstanding members
            of the community, people who show kindness and inclusiveness in the
            community.
          </Paragraph>
        </SubCard>
      </MaxWidthWrapper>
    </PageContent>
  );
}
