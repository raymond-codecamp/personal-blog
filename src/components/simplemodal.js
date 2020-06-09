import React from "react";
import { Grid, Divider, Modal, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
function SimpleModal(props) {
  const { title, modalOpen, handleModal, body } = props;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    title: {
      fontWeight: "bold",
      padding: 10,
    },
    paper: {
      minWidth: "60vh",
      maxWidth: "100vh",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: 5,
      textAlign: "center",
    },
    divider: {
      marginTop: "3vh",
    },
  }));
  const classes = useStyles();
  return (
    <Modal
      open={modalOpen}
      onClose={handleModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <div className={classes.paper}>
            <Typography
              className={classes.title}
              variant="subtitile1"
              id="simple-modal-title"
            >
              {title}
            </Typography>
            <Divider className={classes.divider} />
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{ minWidth: "50vh" }}
            >
              <Grid item xs={7}>
                {body}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Modal>
  );
}
export default SimpleModal;
