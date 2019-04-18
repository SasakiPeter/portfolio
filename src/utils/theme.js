import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#e1ffff",
      main: "#adf3ff",
      dark: "#7bc0cc",
      contrastText: "#000"
    },
    secondary: {
      light: "#fcffff",
      main: "#c9dcdd",
      dark: "#98aaab",
      contrastText: "#000"
    },
    background: {
      default: "#FAFAFA"
    }
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiDivider: {
      root: {
        width: "100%"
      }
    },
    MuiTypography: {
      lineHeight: "1.5",
      color: "#24292e",
      fontFamily:
        '-apple-system,BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: "16px",
      lineHeight: "1.5",
      wordWrap: "break-word",
      root: {
        lineHeight: "1.5",
        color: "#24292e",
        fontFamily:
          '-apple-system,BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: "16px",
        lineHeight: "1.5",
        wordWrap: "break-word"
      },
      h1: {
        color: "#24292e",
        fontFamily:
          '-apple-system,BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol"',
        margin: "24px 0 16px 0",
        fontWeight: 600,
        lineHeight: 1.25,
        paddingBottom: "0.3em",
        fontSize: "2em",
        borderBottom: "1px solid #eaecef"
      },
      h2: {
        color: "#24292e",
        fontFamily:
          '-apple-system,BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol"',
        margin: "24px 0 16px 0",
        fontWeight: 600,
        lineHeight: 1.25,
        paddingBottom: "0.3em",
        fontSize: "1.5em",
        borderBottom: "1px solid #eaecef"
      },
      h3: {
        color: "#24292e",
        fontFamily:
          '-apple-system,BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol"',
        margin: "24px 0 16px 0",
        fontWeight: 600,
        lineHeight: 1.25,
        paddingBottom: "0.3em",
        fontSize: "1.25em"
      },
      h4: {
        color: "#24292e",
        fontFamily:
          '-apple-system,BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol"',
        margin: "24px 0 16px 0",
        fontWeight: 600,
        lineHeight: 1.25,
        paddingBottom: "0.3em",
        fontSize: "1em"
      },
      body1: {
        lineHeight: "1.5",
        color: "#24292e",
        fontFamily:
          '-apple-system,BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol"',
        margin: "0",
        lineHeight: "1.5",
        wordWrap: "break-word",
        fontSize: "16px"
      },
      body2: {
        lineHeight: "1.5",
        color: "#24292e",
        fontFamily:
          '-apple-system,BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol"',
        margin: "0 0 16px",
        lineHeight: "1.5",
        wordWrap: "break-word",
        fontSize: "16px"
      }
    }
  }
});
