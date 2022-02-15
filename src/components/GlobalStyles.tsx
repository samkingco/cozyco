import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: Arnold;
    font-display: fallback;
    src: url(/fonts/Arnold-Italic.woff2) format("woff2");
    font-style: italic;
    font-weight: normal;
  }
  
  * {
    padding: 0;
    margin: 0;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  html,
  body,
  div#__next {
    height: 100%;
  }

  html {
    background: ${(p) => p.theme.colors.bgStrong};
  }
  
  body {
    font-family: ${(p) => p.theme.fonts.body};
    font-size: 20px;
    line-height: 1.6;
    color: ${(p) => p.theme.colors.fgBase};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
  }

  div#__next {
    display: flex;
    flex-direction: column;
  }

  button, input[type="submit"], input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      color: ${(p) => p.theme.colors.fgStrong};
    }
  }

  ul {
    margin-left: 1.5rem;
  }

  strong {
    font-weight: 600;
  }

  .web3modal-modal-lightbox {
    z-index: 100 !important;
  }
`;
