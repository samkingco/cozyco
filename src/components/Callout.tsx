import styled from "styled-components";
import withMargin from "./withMargin";
import withShadows from "./withShadow";

export const Callout = styled.div`
  padding: ${(p) => p.theme.spacing.s};
  ${withShadows};
  ${withMargin};
`;
