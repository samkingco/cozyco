import styled from "styled-components";
import { DiscordLinkIcon } from "./icons/DiscordLinkIcon";
import { TwitterLinkIcon } from "./icons/TwitterLinkIcon";
import { Paragraph } from "./Typography";

const FooterWrapper = styled.footer`
  display: grid;
  grid-template-columns: 1fr max-content max-content;
  grid-gap: 16px;
  text-align: left;
  padding: 16px 16px 24px;
  background: ${(p) => p.theme.colors.bgStrong};

  @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
    padding: 40px 32px;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    padding: 40px 64px;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.l}) {
    padding: 40px 128px;
  }
`;

const FooterText = styled(Paragraph)`
  font-family: ${(p) => p.theme.fonts.heading};
  font-style: italic;
  font-size: ${(p) => p.theme.fontSizes.xs};
`;

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      <FooterText>&copy;{currentYear} cozy co. All Rights Reserved.</FooterText>
      <DiscordLinkIcon />
      <TwitterLinkIcon />
    </FooterWrapper>
  );
}
