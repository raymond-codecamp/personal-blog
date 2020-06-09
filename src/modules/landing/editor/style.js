import {makeStyles} from '@material-ui/core/styles';
//import {colors} from 'utils/theme';

const colors = {
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
export const useStyles = makeStyles((theme)=>({
    root:{
        display:"flex",
        marginTop: "5vh",
    },
    editor:{
        margin:"3vh"
    },
    editorButton:{
        backgroundColor:colors.cl_navy,
        color:colors.cl_white,
        padding: "2vh",
        margin:"2vh",
        width: "20vh",
        "&:hover": {
            backgroundColor: colors.cl_navy,
        }
    },
    card:{
        minWidth: "100vh",
        maxWidth: "110vh",
        minHeight: "50vh",
    },
    htmlcontainer:{
        minHeight: "30vh",
        margin: "3vh",
    },
    title:{
        margin: "2vh"
    },
    htmlContent:{
        margin: "2vh"
    },
    wrapper:{
        backgroundColor: theme.palette.background.paper,
        margin: "2vh"
    },
    icon:{
        padding:"1vh",
        fontSize: 30,
    },  
    chip:{
        color: colors.cl_white,
        fontWeight:"bold",
        margin: "1vh",
    },  
}));