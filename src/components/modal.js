import React from 'react';
import {
    Grid,
    Modal,
    Typography,
    Divider,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      minWidth: "60vh",
      maxWidth: "100vh",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 5,
      textAlign: "center",
    },
    divider:{
        marginTop: "3vh"
    },
    contents:{
        textAlign: "justify",
        justifySelf:"center",
        alignItems: "center",
        minWidth: "10vh"
    },
    close:{

    }
}));

function CustomModal(props)
{
    const {
        title,
        content,
        open,
        callback,
        close
    } = props;
    const classes = useStyles();
    const body = (
        <Grid
            container
            alignItems="center"
            justify="center"
            style={{minHeight:"100vh"}}
        >
            <Grid item>
                <div className={classes.paper}>
                    <Typography 
                        className={classes.modalTitle}
                        variant="subtitile1"
                        id="simple-modal-title"
                    >
                        {title}
                    </Typography>
                    <Divider className={classes.divider}/>
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        style={{minWidth: "50vh"}}
                    >
                        <Grid
                            item
                            xs={7}
                        >
                            <p className={classes.contents} id="simple-modal-description">
                                {content}
                            </p>
                            {close ? <Button onClick={callback}>
                                Close
                            </Button>:null}
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
      );
    return(
        <div>
            <Modal
                open={open}
                onClose={callback}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
    
}
export default CustomModal;