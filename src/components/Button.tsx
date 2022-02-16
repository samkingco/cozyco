import styled, { css } from "styled-components";
import withMargin from "./withMargin";

interface ButtonProps {
  margin?: string;
}

export const buttonStyles = css<ButtonProps>`
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  margin: 0;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${(p) => p.theme.colors.bgBase};
  color: ${(p) => p.theme.colors.fgStrong};
  font-family: ${(p) => p.theme.fonts.heading};
  font-style: italic;
  font-size: ${(p) => p.theme.fontSizes.s};
  line-height: 1.25;
  font-weight: normal;
  cursor: pointer;
  text-decoration: none;
  text-transform: lowercase;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 150ms ease;

  &:hover:not(:disabled),
  &:focus-visible {
    background: ${(p) => p.theme.colors.bgStrong};
  }

  &:disabled {
    background: ${(p) => p.theme.colors.bgDisabled};
    color: ${(p) => p.theme.colors.fgDisabled};
    cursor: default;
  }
`;

export const Button = styled.button<ButtonProps>`
  ${buttonStyles};
  ${withMargin};
`;

export const LinkButton = styled.a<ButtonProps>`
  ${buttonStyles};
  position: relative;
  text-decoration: none;
  ${withMargin};
`;
