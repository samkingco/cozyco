import styled, { css } from "styled-components";
import { Theme } from "./theme";
import withMargin from "./withMargin";

interface TypographyProps {
  size?: keyof Theme["fontSizes"];
  margin?: string;
}

const baseHeadingStyles = css`
  font-family: ${(p) => p.theme.fonts.heading};
  color: ${(p) => p.theme.colors.fgStrong};
  font-style: italic;
  font-weight: normal;
  margin: 0;

  a {
    font-weight: normal;
  }
`;

export const H1 = styled.h1<TypographyProps>`
  font-size: ${(p) =>
    p.size ? p.theme.fontSizes[p.size] : p.theme.fontSizes.xl};
  line-height: 1.25;
  ${baseHeadingStyles};
  ${withMargin};
`;

export const H2 = styled.h2<TypographyProps>`
  font-size: ${(p) =>
    p.size ? p.theme.fontSizes[p.size] : p.theme.fontSizes.xl};
  line-height: 1.3;
  ${baseHeadingStyles};
  ${withMargin};
`;

export const H3 = styled.h3<TypographyProps>`
  font-size: ${(p) =>
    p.size ? p.theme.fontSizes[p.size] : p.theme.fontSizes.l};
  ${baseHeadingStyles};
  ${withMargin};
`;

export const H4 = styled.h4<TypographyProps>`
  font-size: ${(p) =>
    p.size ? p.theme.fontSizes[p.size] : p.theme.fontSizes.m};
  ${baseHeadingStyles};
  ${withMargin};
`;

export const Paragraph = styled.p<TypographyProps>`
  font-size: ${(p) =>
    p.size ? p.theme.fontSizes[p.size] : p.theme.fontSizes.m};
  font-family: ${(p) => p.theme.fonts.body};
  line-height: 1.5;
  margin: 0;
  ${withMargin};
`;

export const LongWord = styled.span`
  overflow-wrap: break-word;
`;
