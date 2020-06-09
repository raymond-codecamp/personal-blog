import {makeStyles} from '@material-ui/core/styles';
import {colors} from 'utils/theme';


export const useStyles = makeStyles((theme)=>({
    root:
    {
        display: "flex",
    },
    rigtPanel:{
        backgroundImage: "linear-gradient("+colors.cl_navy+", "+colors.cl_gradient_ligt+")",
    },
    image:{
        width:"35vh"
    },
}));