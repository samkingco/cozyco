import { MaxWidthWrapper } from "@cozy/components/MaxWidthWrapper";
import { PageContent } from "@cozy/components/PageContent";
import { PageTitle } from "@cozy/components/PageTitle";
import { H2, H4, Paragraph } from "@cozy/components/Typography";
import Head from "next/head";
import React from "react";

export default function About() {
  const metaTitle = "our story • cozy co.";
  const metaDescription =
    "a little bit about how we came to be, and how we’re staying cozy";

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
        <PageTitle title="Our story" quilty="hearts" />
        <Paragraph size="s">October 2021</Paragraph>
        <H2 margin="8 0 12">Getting cozy</H2>
        <Paragraph margin="24 0 0">
          In October of 2021, the Quilt Stitcher released their collection of
          on-chain, solidity crafted <a href="https://quilts.art">quilts</a>{" "}
          onto the Ethereum network.
        </Paragraph>
        <Paragraph margin="12 0 0">
          4,000 quilts were collected over a single weekend by over 1,200
          customers!
        </Paragraph>
        <Paragraph margin="12 0 0">
          The Quilt Stitcher was blown away by the community’s support and it
          lead to the creation of cozy co. The company was started with the aim
          of making inclusive and fun products for your space in the digital
          world.
        </Paragraph>

        <Paragraph size="s" margin="64 0 0">
          2022 and onwards
        </Paragraph>
        <H2 margin="8 0 12">Staying cozy</H2>
        <Paragraph margin="24 0 0">
          We don’t have a roadmap set in stone. We do however want to explore
          and create, whether that’s illustration, 3D, more on-chain art, or
          something entirely new. So long as it fits with our ethos, we’ll try
          it!
        </Paragraph>
        <Paragraph margin="12 0 0">
          We want to showcase artists, and support collaboration from within our
          humble community.
        </Paragraph>
        <Paragraph margin="12 0 0">
          We believe everyone is an artist at heart, they just need it teasing
          out of them. If you would like to work with cozy co, please reach out
          on <a href="/s/twitter">Twitter</a> or in{" "}
          <a href="/s/discord">Discord</a>. Alternatively you can email us on{" "}
          <a href="mailto:collabs@cozyco.studio">collabs@cozyco.studio</a>.
        </Paragraph>
        <H4 size="m" margin="64 0 0">
          So come and join us on this adventure,
          <br />
          But most of all, stay cozy!
        </H4>
      </MaxWidthWrapper>
    </PageContent>
  );
}
