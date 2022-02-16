import { LinkButton } from "@cozy/components/Button";
import { MaxWidthWrapper } from "@cozy/components/MaxWidthWrapper";
import { PageContent } from "@cozy/components/PageContent";
import { H1, H3, Paragraph } from "@cozy/components/Typography";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const PostCard = styled.div`
  background: ${(p) => p.theme.colors.bgMuted};
  padding: 16px;
  border-radius: 16px;
  & + & {
    margin-top: 32px;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
    padding: 32px;
    border-radius: 24px;
  }
`;

function Index() {
  return (
    <PageContent>
      <MaxWidthWrapper as="section">
        <H1 margin="32 0 24">Setting up the studio</H1>
        <Paragraph>
          Hold tight, we’re still getting things ready around here! Stay up to
          date with progress on our <a href="/s/twitter">Twitter</a> and{" "}
          <a href="/s/discord">Discord</a>.
        </Paragraph>
      </MaxWidthWrapper>

      <MaxWidthWrapper as="section" margin="40 0 0">
        <PostCard>
          <Paragraph size="s">January 2022</Paragraph>
          <H3 margin="8 0 12">
            <Link href="/updates/quilts-two-point-oh">
              <a>Quilts 2.0 - Customization</a>
            </Link>
          </H3>
          <Paragraph size="s" margin="0 0 16">
            I thought I'd give a more detailed update on the things I've been
            working on and thinking about since the initial Quilts release back
            in October.
          </Paragraph>
          <Link href="/updates/quilts-two-point-oh">
            <LinkButton>read more &rarr;</LinkButton>
          </Link>
        </PostCard>

        <PostCard>
          <Paragraph size="s">December 2021</Paragraph>
          <H3 margin="8 0 12">
            <Link href="/membership">
              <a>Hello cozy co.</a>
            </Link>
          </H3>
          <Paragraph size="s" margin="0 0 16">
            To celebrate the formation of cozy co, the Quilt Stitcher has
            released a very limited number of special cards. Each card gives the
            holder exclusive access and discounts on cozy wares.
          </Paragraph>
          <Link href="/membership">
            <LinkButton>claim membership card &rarr;</LinkButton>
          </Link>
        </PostCard>

        <PostCard>
          <Paragraph size="s">October 2021</Paragraph>
          <H3 margin="8 0 12">
            <a href="https://quilts.art">Quilts on-chain</a>
          </H3>
          <Paragraph size="s" margin="0 0 16">
            The project that started it all! Quilts is a set of 4,000 cozy
            quilts, stitched completely on-chain and stored on the Ethereum
            network, forever. They're great to keep your other NFT's warm when
            it's cold outside.
          </Paragraph>
          <LinkButton href="https://quilts.art">quilts.art &rarr;</LinkButton>
        </PostCard>
      </MaxWidthWrapper>
    </PageContent>
  );
}

export default Index;
