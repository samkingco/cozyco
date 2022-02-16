import { Button } from "@cozy/components/Button";
import { LoadingIndicator } from "@cozy/components/LoadingIndicator";
import { MaxWidthWrapper } from "@cozy/components/MaxWidthWrapper";
import { PageContent } from "@cozy/components/PageContent";
import { PageTitle } from "@cozy/components/PageTitle";
import { H2, Paragraph } from "@cozy/components/Typography";
import { connectOptions } from "@cozy/utils/connectOptions";
import { useWallet } from "@gimmixorg/use-wallet";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

enum ClaimRolesState {
  NO_DISCORD_AUTH = "NO_DISCORD_AUTH",
  NOT_CONNECTED = "NOT_CONNECTED",
  WRONG_NETWORK = "WRONG_NETWORK",
  READY = "READY",
  CLAIMING_ROLES = "CLAIMING_ROLES",
  CLAIMED_ROLES = "CLAIMED_ROLES",
  ERROR = "ERROR",
}

interface RoleMap {
  [roleId: string]: {
    label: string;
    color: string;
  };
}

const roleMap: RoleMap = {
  "942837779761614890": {
    label: "friend of cozy co",
    color: "#cfc3b2",
  },
  "943068242799378432": {
    label: "snuggler",
    color: "#9679fc",
  },
  "901649257038237758": {
    label: "quilt collector",
    color: "#5d98f1",
  },
  "900207882828668988": {
    label: "pretty cozy",
    color: "#95d17a",
  },
};

const ActionCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: ${(p) => p.theme.colors.bgMuted};
  border-radius: 8px;
  margin-top: 24px;
  text-align: center;
`;

const Roles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

const Role = styled(Paragraph)<{ $roleColor?: string }>`
  display: inline-flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 6px 12px;
  border: 2px solid ${(p) => p.theme.colors.bgStrong};

  &:before {
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    margin-right: 8px;
    background: ${(p) => p.$roleColor || p.theme.colors.fgAccent};
  }
`;

export default function DiscordRoles() {
  const { data: session } = useSession();
  const { account, provider, connect, network } = useWallet();
  const [claimRolesState, setClaimRolesState] = useState<ClaimRolesState>(
    ClaimRolesState.NO_DISCORD_AUTH
  );
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    if (!session) {
      setClaimRolesState(ClaimRolesState.NO_DISCORD_AUTH);
      return;
    }
    if (session && !account) {
      setClaimRolesState(ClaimRolesState.NOT_CONNECTED);
      return;
    }
    if (session && account) {
      if (network?.chainId !== 1) {
        setClaimRolesState(ClaimRolesState.WRONG_NETWORK);
        return;
      }
      setClaimRolesState(ClaimRolesState.READY);
      return;
    }
  }, [session, account, network]);

  const assignRoles = async () => {
    const sig = await provider
      ?.getSigner()
      .signMessage("Claim cozy co discord roles")
      .catch((error) => {
        console.error(error.message);
        setClaimRolesState(ClaimRolesState.ERROR);
      });

    if (!sig) {
      setClaimRolesState(ClaimRolesState.ERROR);
    }

    return fetch("/api/set-roles", {
      body: JSON.stringify({
        sig,
      }),
      method: "POST",
    }).then((res) => res.json());
  };

  const claimRoles = async () => {
    setClaimRolesState(ClaimRolesState.CLAIMING_ROLES);
    const { roles: newRoles } = await assignRoles();
    setRoles(newRoles);
    setClaimRolesState(ClaimRolesState.CLAIMED_ROLES);
  };

  const metaTitle = "discord roles • cozy co.";
  const metaDescription =
    "connect your wallet and get some cozy roles in our discord";

  return (
    <PageContent>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
      </Head>
      <MaxWidthWrapper as="section">
        <PageTitle title="Claim discord roles" quilty="bot" />
        <Paragraph>
          Want those cool Discord roles? Log in and connect your wallet. Roles
          will be added based on the NFTs you own, like quilts, or our
          membership card.
        </Paragraph>

        <ActionCard>
          {claimRolesState === ClaimRolesState.NO_DISCORD_AUTH && (
            <Button margin="m 0 0" onClick={() => signIn("discord")}>
              log in with discord
            </Button>
          )}

          {claimRolesState === ClaimRolesState.NOT_CONNECTED && (
            <>
              <H2 size="m">Connect wallet</H2>
              <Paragraph size="s" margin="8 0 16">
                Now connect your wallet. Make sure it’s the wallet with your
                cozy co NFTs!
              </Paragraph>
              <Button margin="m 0 0" onClick={() => connect(connectOptions)}>
                connect wallet
              </Button>
            </>
          )}

          {claimRolesState === ClaimRolesState.READY && (
            <>
              <H2 size="m">Claim roles</H2>
              <Paragraph size="s" margin="8 0 16">
                Now you just need to claim your roles. We’ll check your wallet
                balances so you’ll need to sign a message to confirm, just like
                logging in to OpenSea.
              </Paragraph>
              <Button margin="m 0 0" onClick={() => claimRoles()}>
                claim roles
              </Button>
            </>
          )}

          {claimRolesState === ClaimRolesState.CLAIMING_ROLES && (
            <LoadingIndicator />
          )}

          {claimRolesState === ClaimRolesState.ERROR && (
            <Paragraph size="s">
              Whoops, something went wrong… reload the page and try again
            </Paragraph>
          )}

          {claimRolesState === ClaimRolesState.CLAIMED_ROLES && (
            <>
              {roles.length > 0 ? (
                <>
                  <H2 size="m">Nice, your roles are synced</H2>
                  <Paragraph size="s" margin="8 0 16">
                    Drop by the <a href="/s/discord">Discord</a> to give them a
                    spin. Don’t forget to say hi!
                  </Paragraph>
                  <Roles>
                    {roles.map((role) => (
                      <Role size="s" $roleColor={roleMap[role].color}>
                        {roleMap[role].label}
                      </Role>
                    ))}
                  </Roles>
                </>
              ) : (
                <>
                  <H2 size="m">No roles to claim</H2>
                  <Paragraph size="s" margin="8 0 0">
                    This is likely because the wallet you connected with has no
                    cozy co NFTs in it.
                  </Paragraph>
                </>
              )}
            </>
          )}
        </ActionCard>
      </MaxWidthWrapper>
    </PageContent>
  );
}
