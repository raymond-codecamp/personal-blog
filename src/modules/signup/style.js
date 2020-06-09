import {makeStyles} from '@material-ui/core/styles';
import {colors} from 'utils/theme';


export const useStyles = makeStyles((theme)=>({
    wrapper:{
        display: "flex",
        
    },
    container:{
        minHeight: '80vh'
    },
    card:{
        width: "80vh",
        marginTop: "15vh",
        boxShadow: '0px 0px 5px 1px '+ colors.cl_shadow,
    },
    innerWrapper:{
        minHeight: "50vh",
    },
    signup_button:{
        backgroundColor: colors.cl_navy,
        color: colors.cl_white,
        fontWeight: "bold",   
        minWidth: "58vh",
        "&:hover": {
            backgroundColor: colors.cl_navy,
        }
    },
    title:{
        marginLeft: "30vh",
        padding: '5vh',
        color: colors.cl_navy,
        fontSize: 20,
        fontWeight: "bold",
    },
    error:{
        color: colors.cl_error,
        fontSize: 10,
        height: 20,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));