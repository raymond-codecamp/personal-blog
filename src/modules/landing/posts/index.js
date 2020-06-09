import React, { useState, useEffect } from "react";
import {
  Grid,
  Snackbar,
  Typography,
  Divider,
  IconButton,
  Card,
  Button,
} from "@material-ui/core";
import Loader from "react-dots-loader";
import "react-dots-loader/index.css";
import { colors } from "utils/theme";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MuiAlert from "@material-ui/lab/Alert";
import { ERROR, SUCCESS, NETWORK_ERROR } from "utils/constants";
import Http from "utils/Http";
import Auth from "utils/auth";
import { useStyles } from "./styles";
import HTMLPublisher from "components/htmlpublisher";
import BreadCrumb from "components/breadcrump";
import Modal from "components/simplemodal";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Posts(props) {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [viewPost, setViewPost] = useState(false);
  const [postContent, setPostContent] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState();
  const [docId, setDocId] = useState();
  const [isItemLoading, setItemLoading] = useState({});
  useEffect(function () {
    getData();
  }, []);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  function errorMessage(errMessage = NETWORK_ERROR) {
    setMessage(errMessage);
    setAlertType(ERROR);
    setOpenSnackBar(true);
    setLoading(false);
  }

  async function getData() {
    var currentUser = Auth.getUser();
    console.log(currentUser);
    var response = await Http.get("/fetchPosts/" + currentUser);
    console.log(response);

    if (response.status === 200) {
      let getter = response.data;
      setPosts(getter.docs);
      createLoaders(getter.docs);
      setLoading(false);
    } else if (response.status === 404) {
      errorMessage(response.data.message);
    } else {
      errorMessage();
    }
  }
  function getStringMonth(month) {
    switch (month) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        return null;
    }
  }
  function breadcrumpAction() {
    setViewPost(false);
  }
  const handleModal = () => {
    console.log("clicked");
    setModalOpen(!modalOpen);
  };
  function deleteFunction() {
    let loaders = isItemLoading;
    loaders[docId] = true;
    setItemLoading(loaders);
    let response = Http.delete(`/deletePost/${docId}`)
      .then(function (success) {
        if (success.status === 200) {
          getData();
          setMessage(success.data.Message);
          setAlertType(SUCCESS);
          setOpenSnackBar(true);
        } else {
          errorMessage(NETWORK_ERROR);
        }
      })
      .catch(function (error) {
        errorMessage();
      });
  }
  function createLoaders(posts) {
    posts.forEach(function (doc) {
      let loaders = isItemLoading;
      let docId = doc.docId;
      loaders[docId] = false;
      setItemLoading(loaders);
    });
  }
  const modalBody = (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="body1">Do you want to Delete the Post?</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid
          conatiner
          justify="flex-end"
          alignItems="space-around"
          style={{ marginTop: "5vh" }}
        >
          <Button
            style={{ margin: "2vh" }}
            onCLick={() => {
              handleModal();
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{ margin: "2vh", color: "white" }}
            onClick={() => {
              deleteFunction();
            }}
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
  console.log(isItemLoading);
  return (
    <div>
      {isLoading ? (
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <CircularProgress color="primary" />
        </Grid>
      ) : (
        <>
          {viewPost ? (
            <>
              <Card className={classes.htmlCard}>
                <BreadCrumb
                  title={title}
                  callback={breadcrumpAction}
                  style={{ marginTop: "50vh" }}
                ></BreadCrumb>
                <Typography variant="h2" className={classes.postTitle}>
                  {title}
                </Typography>
                <Divider></Divider>
                <HTMLPublisher data={postContent} />
              </Card>
            </>
          ) : (
            <Grid
              container
              alignItems="center"
              justify="center"
              display="column"
              spacing={5}
              className={classes.wrapper}
            >
              <Grid item xs={12}>
                <Typography variant="h3" className={classes.title}>
                  Your Blog Posts
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                {posts.map(function (post) {
                  let date = new Date(post.docData.postOn);
                  let docId = post.docId;
                  let formated =
                    date.getDate() +
                    "th " +
                    getStringMonth(date.getMonth() + 1) +
                    " " +
                    date.getFullYear();

                  return (
                    <>
                      {!isLoading && isItemLoading[docId] ? (
                        <Grid
                          container
                          justify="center"
                          alignItems="center"
                          style={{ minWidth: "100vh" }}
                        >
                          <Loader size={13} color={colors.cl_navy}></Loader>
                        </Grid>
                      ) : (
                        <Grid
                          container
                          alignItems="flex-start"
                          justify="flrx-start"
                          className={classes.postWrapper}
                        >
                          <Grid item xs={12}>
                            <Typography
                              variant="h4"
                              className={classes.subtitle}
                            >
                              {post.docData.postTitle}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="body2"
                              className={classes.postedOn}
                            >
                              {`Posted On : ${formated}`}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid
                              container
                              justify="flex-end"
                              alignItems="flex-end"
                              style={{ minWidth: "50vh" }}
                            >
                              <Grid item>
                                <IconButton
                                  onClick={() => {
                                    setDocId(post.docId);
                                    handleModal();
                                  }}
                                >
                                  <DeleteIcon className={classes.icon} />
                                  <Modal
                                    modalOpen={modalOpen}
                                    handleModal={handleModal}
                                    body={modalBody}
                                    title="Conformation"
                                  />
                                </IconButton>
                              </Grid>
                              <Grid item>
                                <IconButton>
                                  <VisibilityIcon
                                    className={classes.icon}
                                    onClick={function () {
                                      setPostContent(post.docData.postContent);
                                      setTitle(post.docData.postTitle);
                                      setViewPost(true);
                                    }}
                                  />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <FavoriteIcon className={classes.smallIcon} />
                            {` ${post.docData.postLikes.length - 1} Likes`}
                          </Grid>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        </Grid>
                      )}
                    </>
                  );
                })}
              </Grid>
            </Grid>
          )}
          <Snackbar
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={handleCloseSnackBar}
          >
            <Alert onClose={handleCloseSnackBar} severity={alertType}>
              {message}
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
}
export default Posts;
