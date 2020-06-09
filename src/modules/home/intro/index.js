import React from 'react';
import {Grid, Typography, Card} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {colors} from 'utils/theme';


export const useStyles = makeStyles((theme)=>({
    facingCard:{
        width: "40vh",
        boxShadow: "0px 0px 5px 2px "+colors.cl_shadow,
        height: "55vh"
    },
    facingImage:{
        maxWidth: "45vh"
    },
    facingTitle:{
        fontWeight: "bold",
    },
    facingBody:{
        padding: "3vh",
        maxWidth: "35vh",
        textAlign:"justify",
    },
}));

function Introduction(props)
{
    const classes = useStyles(); 
    return(
        <Grid 
        container  
        alignItems="space-evenly" 
        justify="space-evenly"
        style={{minHeight: "40vh"}}
        >
            <Grid item>
                <Card
                    className={classes.facingCard}
                >
                    <Grid
                        container
                        direction="column"
                        alignItems="flex-start"
                        justify="center"
                    >
                        <Grid
                            item
                        >
                            <img src={require('assets/images/image_one.jpg')} alt="image_one" className={classes.facingImage}/>
                        </Grid>
                        <Grid
                            container
                            alignItems="center"
                            justify="center"
                        >
                            <Typography variant="h3" className={classes.facingTitle}>
                                What we offer ?
                            </Typography>
                        </Grid>
                        <Grid
                            item
                        >
                            <Typography variant="body2" className={classes.facingBody}>
                                We provide bloggin service with 99% uptime and provide flexibility over what you do.
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item>
                <Card
                    className={classes.facingCard}
                >
                    <Grid
                        container
                        direction="column"
                        alignItems="flex-start"
                        justify="center"
                    >
                        <Grid
                            item
                        >
                            <img src={require('assets/images/image_two.jpg')} alt="image_two" className={classes.facingImage}/>
                        </Grid>
                        <Grid
                            container
                            alignItems="center"
                            justify="center"
                        >
                            <Typography variant="h3" className={classes.facingTitle}>
                               Why we are different ?
                            </Typography>
                        </Grid>
                        <Grid
                            item
                        >
                            <Typography variant="body2" className={classes.facingBody}>
                                We bridge the heritage and modern world, yes ofcourse we find hapiness in it.
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item>
                <Card
                    className={classes.facingCard}
                >
                    <Grid
                        container
                        direction="column"
                        alignItems="flex-start"
                        justify="center"
                    >
                        <Grid
                            item
                        >
                            <img src={require('assets/images/image_three.jpg')} alt="image_three" className={classes.facingImage}/>
                        </Grid>
                        <Grid
                            container
                            alignItems="center"
                            justify="center"
                        >
                            <Typography variant="h3" className={classes.facingTitle}>
                               Our motto ?
                            </Typography>
                        </Grid>
                        <Grid
                            item
                        >
                            <Typography variant="body2" className={classes.facingBody}>
                                We love nature which we live in, we took the outh to protect our nature by go paper free as it save lot of trees.
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
       </Grid>
    );
}
export default Introduction;