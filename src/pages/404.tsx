import { PageContent } from "@cozy/components/PageContent";
import { Paragraph } from "@cozy/components/Typography";
import Head from "next/head";
import Link from "next/link";
import React from "react";

function Error404() {
  return (
    <PageContent>
      <Head>
        <title>404 • Cozy Co.</title>
      </Head>
      <div className="centered-content">
        <Paragraph>
          <strong>Page not found</strong>
        </Paragraph>
        <Paragraph>
          <Link href="/">
            <a>Back home</a>
          </Link>
        </Paragraph>
      </div>
    </PageContent>
  );
}

export default Error404;
