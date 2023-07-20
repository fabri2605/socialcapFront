import { color, ColorMode, extendTheme, theme } from "@chakra-ui/react";
import { theme as proTheme } from "@chakra-ui/theme";
import { colors } from "./colors";
import { DM_Sans, DM_Mono } from "@next/font/google";
const sizes = {
  sizes: {
    max: "max-content",
    min: "min-content",
    full: "100%",
    "3xs": "14rem",
    "2xs": "16rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "76px",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    "8xl": "90rem",
    container: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
};

export const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const customTheme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: { ...colors, brand: colors.brandBlue },
  sizes,
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  breakpoints: {
    sm: "30em",
    md: "60em",
    lg: "75em",
    xl: "80em",
    "2xl": "96em",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "-0.3px",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  styles: {
    global: ({ colorMode }: { colorMode: ColorMode }) => ({
      body: {
        bg: {
          base: colorMode == "dark" ? "darkMode.500" : colors.whiteSmoke,
          md: colorMode == "dark" ? "darkMode.500" : colors.whiteSmoke,
        },
      },

      h1: {
        fontFamily: dmSans.style.fontFamily,
        fontSize: { base: "48px !important", md: "88px !important" },
        fontWeight: "700 !important",
        lineHeight: { base: "48px !important", md: "88px !important" },
        letterSpacing: "-2.4 px !important",
      },
      h2: {
        fontFamily: dmSans.style.fontFamily,
        fontSize: { base: "32px !important", md: "68px !important" },
        fontWeight: "500 !important",
        lineHeight: { base: "32px !important", md: "68px !important" },
        letterSpacing: "-2.4 px !important",
      },
      h3: {
        fontFamily: dmSans.style.fontFamily,
        fontSize: { base: "24px !important", md: "32px !important" },
        fontWeight: "500 !important",
        lineHeight: "32px !important",
      },
      h4: {
        fontFamily: dmSans.style.fontFamily,
        fontSize: "24px !important",
        fontWeight: "500 !important",
        lineHeight: "32px !important",
      },
      h5: {
        fontFamily: dmSans.style.fontFamily,
        fontSize: { base: "18px !important", md: "20px !important" },
        fontWeight: "400 !important",
        lineHeight: "28px !important",
      },
    }),
  },
  fonts: {
    heading: dmSans.style.fontFamily,
    body: dmSans.style.fontFamily,
    sans: dmSans.style.fontFamily,
  },
});

export default customTheme;
