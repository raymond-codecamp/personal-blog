import { makeStyles } from "@material-ui/core/styles";
//import {colors} from 'utils/theme';

const colors = {
  cl_navy: "#4ABDAC",
  cl_olive: "#7ba800",
  cl_charcol: "#1f1f1f",
  cl_error: "#9e0000",
  cl_success: "#0A690F",
  cl_medium_gray: "#8c8c8c",
  cl_white: "#fff",
  cl_background: "#d4d4d4",
  cl_pink: "#ffaffc",
  cl_light_blue: "#00cdf9",
  cl_shadow: "rgba(0,0,0,0.25)",
  cl_light_grey: "#D8D8D8",
  cl_gradient_ligt: "#b3fcff",
  cl_magentha: "#E80031",
};
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "5vh",
  },
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    width: "115vh",
    margin: "10vh",
  },
  postWrapper: {
    margin: "2vh",
  },
  title: {
    margin: "1vh",
  },
  subtitle: {},
  postedOn: {
    color: colors.cl_medium_gray,
    fontSize: 11,
  },
  icon: {
    fontSize: 30,
  },
  smallIcon: {
    color: colors.cl_magentha,
  },
  htmlCard: {
    padding: "5vh",
    marginTop: "10vh",
    maxWidth: "110vh",
  },
  postTitle: {
    padding: "5vh",
    fontWeight: "bold",
  },
}));
