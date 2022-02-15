import styled from "styled-components";
import { H1 } from "./Typography";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  justify-items: center;
  margin-bottom: 24px;

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background: ${(p) => p.theme.colors.bgStrong};
    margin-top: 8px;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.s}) {
    margin-bottom: 64px;

    &:after {
      margin-top: 48px;
    }
  }
`;

const Title = styled(H1)`
  font-size: ${(p) => p.theme.fontSizes.s};
  text-align: center;
  text-transform: lowercase;
  letter-spacing: 0.25em;
`;

interface Props {
  title: string;
  quilty?: "wink" | "hearts" | "bot";
}

export function PageTitle({ title, quilty }: Props) {
  return (
    <Wrapper>
      {quilty && <img src={`/quilty-${quilty}.svg`} />}
      <Title>{title}</Title>
    </Wrapper>
  );
}
