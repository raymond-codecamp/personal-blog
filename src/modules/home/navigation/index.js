import React from 'react';
import {
    Grid
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {colors} from 'utils/theme';


const useStyles = makeStyles((theme)=>({
    link:{
        textDecoration: "none",
        color: colors.cl_charcol,
        fontWeight: 600,
    }
}));

function NavigationBar(props)
{
    const classes= useStyles();
    return(
        <Grid 
            container  
            alignItems="center" 
            justify="space-evenly"
            style={{height: "10vh",maxWidth: "80vh"}}
            >
                <Grid item>
                    <Link to="/" className={classes.link}>Home</Link>
                </Grid>
                <Grid item>
                    <Link to="/about" className={classes.link}>About Us</Link>
                </Grid>
                <Grid item>
                    <Link to="/signin" className={classes.link}>Sign In</Link>
                </Grid>
                <Grid item>
                    <Link to="/signup" className={classes.link}>Sign Up</Link>
                </Grid>
           </Grid>
    );
}
export default NavigationBar;