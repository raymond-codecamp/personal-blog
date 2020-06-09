import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  TextField,
  Button,
  Divider,
  Modal,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useFormik } from "formik";
import { colors } from "utils/theme";
import EditIcon from "@material-ui/icons/Create";
import SaveIcon from "@material-ui/icons/Done";
import Auth from "utils/auth";
import Http from "utils/Http";
import CustomModal from "components/modal";
import { makeStyles } from "@material-ui/core/styles";
import dummyImage from "assets/images/avatar.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  card: {
    width: "100vh",
    marginTop: "10vh",
  },
  avatar: {
    width: "20vh",
    marginTop: "5vh",
    padding: 10,
    borderRadius: "50%",
  },
  title: {
    fontWeight: "bold",
    padding: 10,
  },
  editPanel: {
    minWidth: "100vh",
  },
  buttonFaceOpen: {
    padding: "2vh",
    fontSize: 25,
    color: colors.cl_charcol,
  },
  buttonFaceSuccess: {
    padding: "2vh",
    fontSize: 25,
    color: colors.cl_success,
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
  contents: {
    textAlign: "justify",
    justifySelf: "center",
    alignItems: "center",
    minWidth: "10vh",
  },
}));

function Profile(props) {
  const classes = useStyles();

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [api, setApi] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isEditable, setEditable] = useState(false);
  const [docId, setDocId] = useState();
  const [userProfile, setUserProfile] = useState({});
  const [description, setDescription] = useState();
  const [title] = useState("Save changes ? ");
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState();
  function reset() {
    setImage(null);
    setEditable(false);
    setModalOpen(false);
  }

  useEffect(function () {
    Auth.getApp().auth().onAuthStateChanged(function (user) {
      setApi({
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });
      loadData(user.email);
    });
  }, []);

  async function loadData(userEmail, loaderStatus = false) {
    var response = await Http.get(`/getUserProfile/${userEmail}`);
    var documentId = response.data.docid[0];
    var profile = response.data.user[0];
    setDocId(documentId);
    setUserProfile(profile);
    if (!loaderStatus) {
      setLoading(false);
    }
  }

  const handleModal = () => {
    console.log("clicked");
    setModalOpen(!modalOpen);
  };

  async function saveProfile() {
    setLoading(true);
    var dataToSend = {
      email: api.email,
      name: name ? name : api.name,
      description: description,
      currentImage: api.image,
    };
    try {
      var data = await Auth.updateUser(dataToSend, docId, file ? file : false);
      reset();
      setTimeout(function () {
        setLoading(false);
        Auth.authenticate().onAuthStateChanged(function (user) {
          setApi({
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          });
          loadData(user.email, true);
        });
      }, 20000);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

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
        <Card className={classes.card}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Grid
                container
                alignItems="flex-end"
                justify="flex-end"
                className={classes.editPanel}
              >
                {isEditable ? (
                  <IconButton
                    className={classes.buttonFaceSuccess}
                    onClick={() => {
                      setLoading(true);
                      handleModal();
                      setEditable(!isEditable);
                      setLoading(false);
                    }}
                  >
                    <SaveIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    className={classes.buttonFaceOpen}
                    onClick={() => {
                      setEditable(!isEditable);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
            <Grid item xs={5}>
              {isEditable ? (
                <div>
                  <label for="file" style={{ cursor: "pointer" }}>
                    <img
                      alt={email}
                      src={api.image ? api.image : dummyImage}
                      className={classes.avatar}
                    />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <img
                  alt={email}
                  src={api.image ? api.image : dummyImage}
                  className={classes.avatar}
                />
              )}
            </Grid>
            <Grid item xs={8}>
              {isEditable ? (
                <TextField
                  defaultValue={api.name ? api.name : "Unknown"}
                  value={name}
                  variant="outlined"
                  onChange={handleChangeName}
                />
              ) : (
                <Typography variant="h3" className={classes.title}>
                  {api.name ? api.name : "Unknown"}
                </Typography>
              )}
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" className={classes.title}>
                {api.email ? api.email : "user@example.com"}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              {isEditable ? (
                <TextField
                  defaultValue={
                    userProfile.description
                      ? userProfile.description
                      : "No data available."
                  }
                  label="About"
                  value={description}
                  variant="outlined"
                  style={{ margin: "4vh" }}
                  onChange={handleChangeDescription}
                />
              ) : (
                <Typography variant="body1" className={classes.title}>
                  <strong>About : </strong>{" "}
                  {userProfile.description
                    ? userProfile.description
                    : "No data available."}
                </Typography>
              )}
            </Grid>
          </Grid>
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
                    className={classes.modalTitle}
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
                      <Grid container justify="center" alignItems="center">
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            Do you want to save changes ?
                          </Typography>
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
                              onClick={saveProfile}
                            >
                              Confirm
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Modal>
        </Card>
      )}
    </div>
  );
}
export default Profile;
