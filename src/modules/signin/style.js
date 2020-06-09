import {makeStyles} from '@material-ui/core/styles';
import { colors } from 'utils/theme';

export const useStyles = makeStyles((theme)=>({
    root:{
        display: "flex",
    },
    wrapper:{
        minHeight: '100vh'
    },
    card:{
        color: colors.cl_navy,
        width: '60vh',
        boxShadow: '0px 0px 5px 2px '+colors.cl_shadow,  
    },
    title:{
        marginLeft: "3vh",
        padding: "1vh",
        fontSize: 18,
        fontWeight: "bold"
    },
    signin_button:{
        color:colors.cl_white,
        backgroundColor:colors.cl_navy,
        width: "33vh",
        padding: 5,
        margin: "5vh",
        "&:hover": {
            backgroundColor: colors.cl_navy,
        }
    },
}));