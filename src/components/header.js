import React from 'react';
import { colors } from 'utils/theme';
import { withRouter } from 'react-router';
import {
    AppBar, 
    IconButton,
    Typography,
    Button,
    Grid
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme)=>({
    root:{
        display: "flex",
    },
    title: {
        fontSize: 30,
        paddingLeft: "5vh",
        color: colors.cl_charcol,
    },
    appBar:{
        backgroundColor: colors.cl_white,
        boxShadow: '0px 3px 5px 2px '+colors.cl_shadow,
    },
    pip_button:{
        color:colors.cl_white,
    },
    logo:{
        width: "10vh",
        margin: "1vh"
    },
}));

function Header(props)
{
    const classes = useStyles();
    function redirectToSignup()
    {
        props.history.push('/signup');
    }
    function redirectToSignin()
    {
        props.history.push('/signin');
    }
    return(
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item xs={10} >
                        <img alt="Logo" src = {require('assets/images/logo.png')} className={classes.logo}/>
                    </Grid>
                    <Grid item xs={2} justify="space-around">
                        <Button className={classes.pip_button} onClick={redirectToSignin}>Sign In</Button>
                        <Button className={classes.pip_button} onClick={redirectToSignup}>Sign Up</Button>
                    </Grid>
                </Grid>
            </AppBar>
        </div>
    );
}
export default withRouter(Header);