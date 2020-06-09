import { createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

export const colors = {
  cl_navy: "#4ABDAC",
  cl_olive: "#7ba800",
  cl_charcol: "#1f1f1f",
  cl_error : '#9e0000',
  cl_success: "#0A690F",
  cl_medium_gray: "#8c8c8c",
  cl_white: "#fff",
  cl_background : "#d4d4d4",
  cl_pink : "#ffaffc",
  cl_light_blue : "#00cdf9",
  cl_shadow : 'rgba(0,0,0,0.25)',
  cl_light_grey: '#D8D8D8',
  cl_gradient_ligt: "#b3fcff"
};

const Muli = require('typeface-muli');
export const baseTheme = createMuiTheme({
  palette: {
    primary: { main: colors.cl_navy },
    secondary: { main: colors.cl_olive },
    error: { main: colors.cl_error },
    text: {
      primary: grey[800],
      secondary: colors.cl_medium_gray
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily:Muli,
    fontSize: "13px"
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
      label: {
        fontWeight: 300,
        fontSize: '14px'
      },
      contained: {
        boxShadow: 'none',
        fontSize: "14px"
      }
    },
    MuiIconButton: {
      root: {
        padding: 5
      }
    },
    MuiTab:{
      root: {
        textTransform: "none",
        fontFamily:Muli,
        fontSize: 14,
        color: colors.cl_charcol,
        textAlign: "left",
      },
    },
    MuiTypography:{
      root:{
        fontFamily: Muli,
        fontWeight: 600,
      }
    }
  }
});
