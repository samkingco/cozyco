import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { Quilty } from "./Quilty";

const Header = styled.header`
  position: relative;
  top: 0;
  z-index: 10;

  display: grid;
  grid-template-areas: "quilty connect" "nav nav";
  grid-template-columns: 1fr max-content;
  align-items: center;
  grid-gap: 16px;
  padding: 16px 16px 24px;

  @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
    grid-template-areas: "quilty connect" "nav nav";
    padding: 24px 32px;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.m}) {
    grid-template-areas: "quilty nav connect";
    grid-template-columns: max-content 1fr max-content;
    grid-gap: 40px;
    padding: 24px 64px;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.l}) {
    grid-template-areas: "quilty nav connect";
    grid-template-columns: max-content 1fr max-content;
    grid-gap: 40px;
    padding: 24px 128px;
  }
`;

const QuiltyWrapper = styled.span`
  grid-area: quilty;
  display: block;
  width: 32px;
  height: 32px;
`;

const NavLinks = styled.nav`
  grid-area: nav;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  margin-left: -12px;
`;

const NavLink = styled.a`
  display: block;
  font-family: ${(p) => p.theme.fonts.heading};
  font-size: ${(p) => p.theme.fontSizes.s};
  font-weight: normal;
  line-height: 1.25;
  text-transform: lowercase;
  text-decoration: none;
  color: ${(p) => p.theme.colors.fgStrong};
  background: ${(p) => p.theme.colors.bgStrong};
  padding: 8px 12px;
  border-radius: 8px;
  transition: color 150ms ease-in-out, background-color 150ms ease-in-out;

  &:hover {
    color: ${(p) => p.theme.colors.fgBase};
    background: ${(p) => p.theme.colors.bgBase};
  }
`;

export function NavBar() {
  const router = useRouter();
  return (
    <Header>
      <Link href="/">
        <a>
          <QuiltyWrapper>
            <Quilty />
          </QuiltyWrapper>
        </a>
      </Link>
      <NavLinks>
        <Link href="/about" passHref>
          <NavLink>About</NavLink>
        </Link>
        <Link href="/membership" passHref>
          <NavLink>Membership</NavLink>
        </Link>
        <Link href="https://quilts.art" passHref>
          <NavLink target="_blank" rel="noopener">
            Quilts
          </NavLink>
        </Link>
      </NavLinks>

      <ConnectWalletButton
        additionalOptions={[
          {
            id: "discord-roles",
            label: "Claim discord roles",
            onSelect: () => router.push("/discord-roles"),
          },
        ]}
      />
    </Header>
  );
}
