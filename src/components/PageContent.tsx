import styled from "styled-components";

export const PageContent = styled.main`
  flex: 1;
  position: relative;
  z-index: 2;
  padding: 24px 16px;
  background: ${(p) => p.theme.colors.bgBase};

  @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
    padding: 64px;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    padding: 64px 64px 128px;
  }
`;
