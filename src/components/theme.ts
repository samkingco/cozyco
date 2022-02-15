export const theme = {
  breakpoints: {
    xs: "24rem",
    s: "36rem",
    m: "56rem",
    l: "70rem",
  },
  fonts: {
    heading: "Arnold, Georgia, serif, Apple Color Emoji, Segoe UI Emoji",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
  },
  fontSizes: {
    xs: "14px",
    s: "16px",
    m: "20px",
    l: "24px",
    xl: "32px",
  },
  colors: {
    bgBase: "#FBF5EE",
    bgStrong: "#F6E6D5",
    bgMuted: "#FFFFFF",
    bgDisabled: "#EBEBEB",
    fgBase: "#6E675E",
    fgStrong: "#2C2926",
    fgDisabled: "#A3A3A3",
    fgAccent: "#F1AA5D",
  },
  maxWidths: {
    s: "32em",
    m: "36em",
    l: "64em",
    xl: "80em",
  },
};

export type Theme = typeof theme;
