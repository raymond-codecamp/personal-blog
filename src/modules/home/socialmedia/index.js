import React from 'react';
import {Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {colors} from 'utils/theme';


export const useStyles = makeStyles((theme)=>({
    faceBook:{
        fontSize: 25,
        color:"#3b5998",
    },
    instaGram:{
        width:21,
    },
    linkedIn: {
        fontSize: 25,
        color: '#0e76a8',
        
    },
}));

function SocialMedia(props)
{
    const classes = useStyles();
    return(
        <Grid 
            container
            alignItems="center" 
            justify="space-evenly"
            style={{height: "5vh",maxWidth: "20vh",marginTop: "5vh"}}
        >
            <Link to="/" className={classes.link}>
                <FacebookIcon className={classes.faceBook}/>
            </Link>
            <Link to="/" className={classes.link}>
                <img src={require('assets/images/instagram.svg')} alt="React Logo" className={classes.instaGram} />
            </Link>
            <Link to="/" className={classes.link}>
                <LinkedInIcon className={classes.linkedIn}/>
            </Link>
        </Grid>
    );
}
export default SocialMedia;