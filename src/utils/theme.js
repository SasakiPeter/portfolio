import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#e1ffff",
      main: "#adf3ff",
      dark: "7bc0cc",
      contrastText: "000"
    },
    secondary: {
      light: "#fcffff",
      main: "#c9dcdd",
      dark: "98aaab",
      contrastText: "000"
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
    }
  }
});
