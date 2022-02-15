import React from "react";
import styled, { css } from "styled-components";
import { CozyCoLogo } from "./CozyCoLogo";
import { NavBar } from "./NavBar";
import { H1 } from "./Typography";

const Wrapper = styled.div<{ $hasIllustration: boolean }>`
  width: 100%;
  position: relative;
  background: ${(p) => p.theme.colors.bgStrong};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;

  ${(p) =>
    p.$hasIllustration &&
    css`
      padding-bottom: 80px;
      @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
        padding-bottom: 128px;
      }
    `}
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 4vw 0 20vw;

  @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
    padding: 4vw 12vw 16vw;
  }
  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    padding: 4vw 12vw;
  }
`;

const LogoLockup = styled.div`
  position: relative;
  z-index: 3;
  max-width: 600px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  justify-items: center;
  padding: 24px;
  margin: 16px;
  color: ${(p) => p.theme.colors.fgStrong};
  background: ${(p) => p.theme.colors.bgBase};
  border-radius: 24px;

  ${H1} {
    color: ${(p) => p.theme.colors.fgBase};
    text-align: center;
    @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
      margin: 0 16px;
      font-size: ${(p) => p.theme.fontSizes.m};
    }
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
    margin: 32px;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    padding: 48px;
    background: transparent;
  }
`;

const IllustrationLeft = styled.div`
  position: absolute;
  bottom: 0;
  left: -4vw;
  width: 100%;
  height: 110%;
  background: url("/header-left.svg") no-repeat bottom left;
  background-size: contain;
  z-index: 2;
  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    left: 0;
  }
`;

const IllustrationRight = styled.div`
  position: absolute;
  bottom: 0;
  right: -4vw;
  width: 100%;
  height: 110%;
  background: url("/header-right.svg") no-repeat bottom right;
  background-size: contain;
  z-index: 1;
  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    right: 0;
  }
`;

interface Props {
  includeIllustration?: boolean;
}

export function Header({ includeIllustration = false }: Props) {
  return (
    <Wrapper $hasIllustration={includeIllustration}>
      <NavBar />
      {includeIllustration && (
        <>
          <Content>
            <LogoLockup>
              <H1 size="s">a studio for all things cozy</H1>
              <CozyCoLogo width={420} />
            </LogoLockup>
          </Content>
          <IllustrationLeft />
          <IllustrationRight />
        </>
      )}
    </Wrapper>
  );
}
