import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  Divider,
  TextField,
  IconButton,
  Chip,
  Tooltip,
  Snackbar,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import RichTextEditor from "components/editor";
import CircularProgress from "@material-ui/core/CircularProgress";
import HTMLPublisher from "components/htmlpublisher";
import MuiAlert from "@material-ui/lab/Alert";
import { ERROR, SUCCESS, PUBLISH_ERROR, NETWORK_ERROR } from "utils/constants";
import Auth from "utils/auth";
import Http from "utils/Http";
import { useStyles } from "./style";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Editor(props) {
  const [ritchText, setRitchText] = useState();
  const [isPreview, setPreview] = useState(false);
  const [tags, setTags] = useState([]);
  const [postTag, setPostTag] = useState();
  const [title, setTitle] = useState();
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [alertType, setAlertType] = useState();
  const [openSnackBar, setOpenSnackBar] = useState(false);

  function resetAll() {
    setRitchText("");
    setPreview(false);
    setTags([]);
    setTitle("");
    setPostTag("");
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  function errorMessage(errMessage = PUBLISH_ERROR) {
    setMessage(errMessage);
    setAlertType(ERROR);
    setOpenSnackBar(true);
    setLoading(false);
  }

  const classes = useStyles();

  useEffect(
    function () {
      if (!isPreview) setLoading(false);
    },
    [isLoading, isPreview]
  );
  function onEditorChange(evt, editor) {
    setRitchText(editor.getData());
  }
  function uploadPost() {
    setLoading(true);
    var currentUser = Auth.getUser();
    var postData = {
      postTitle: title,
      postTags: tags,
      postBy: currentUser,
      postContent: ritchText,
      postLikes: [{}],
      postComments: [{}],
    };
    console.log(postData);
    Http.post("/publishPost", postData)
      .then(function (success) {
        if (success.status === 200) {
          setLoading(false);
          setMessage(success.data.createMessage);
          setAlertType(SUCCESS);
          setOpenSnackBar(true);
          resetAll();
        } else {
          errorMessage(NETWORK_ERROR);
        }
      })
      .catch(function (error) {
        errorMessage();
      });
  }
  function tagHandler(e) {
    setPostTag(e.target.value);
  }
  const handleDelete = (current) => {
    setLoading(true);
    var data = tags;
    data.pop(current);
    setTags(data);
    setPostTag("");
  };
  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }
  return (
    <div className={classes.root}>
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
          {!isPreview ? (
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
                  Draft Your Post
                </Typography>
                <Divider style={{ margin: "2vh" }} />
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Post Name"
                      onChange={handleChangeTitle}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      label="Tags"
                      value={postTag}
                      onChange={tagHandler}
                    />
                    <Tooltip
                      title={
                        postTag
                          ? `Add ${postTag} tag to your post`
                          : `No tag provided`
                      }
                    >
                      <IconButton
                        onClick={() => {
                          if (postTag !== "") {
                            var temp = tags;
                            temp.push(postTag.toUpperCase());
                            setTags(temp);
                            setPostTag("");
                          }
                        }}
                      >
                        <AddBoxIcon className={classes.icon} color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12}>
                    {tags.map(function (data) {
                      return (
                        <Chip
                          label={data}
                          className={classes.chip}
                          onDelete={() => {
                            handleDelete(data);
                          }}
                          color="primary"
                        />
                      );
                    })}
                  </Grid>
                  <Grid item xs={12}>
                    <RichTextEditor
                      onChange={onEditorChange}
                      value={ritchText}
                    ></RichTextEditor>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  justify="flex-end"
                  alignItems="flex-end"
                  style={{ minWidth: "50vh" }}
                >
                  <Button
                    className={classes.editorButton}
                    onClick={() => {
                      if (ritchText) {
                        setPreview(true);
                      }
                    }}
                  >
                    Review Post
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid container alignItems="center" justify="center" spacing={5}>
                <Card className={classes.card}>
                  <Grid container alignItems="center" justify="center">
                    <Grid item xs={12} className={classes.htmlcontainer}>
                      <Typography variant="h3" className={classes.title}>
                        Editor's Review
                      </Typography>
                      <Divider />
                      <HTMLPublisher
                        data={ritchText}
                        className={classes.htmlContent}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        justify="flex-end"
                        alignItems="flex-end"
                        style={{ minWidth: "50vh" }}
                      >
                        <Button
                          style={{ padding: "2vh", margin: "2vh" }}
                          onClick={() => {
                            setPreview(false);
                          }}
                        >
                          Edit Post
                        </Button>
                        <Button
                          className={classes.editorButton}
                          onClick={() => {
                            uploadPost();
                          }}
                        >
                          Publish Post
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </>
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
export default Editor;
