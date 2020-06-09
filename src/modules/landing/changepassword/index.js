import React, { useState, useEffect } from "react";
import { 
  Grid, 
  Typography, 
  Button, 
  TextField,
  Card,
  Tabs,
  Tab, 
  Box,
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/CircularProgress";
import { ChangepasswordValidator } from "utils/validation";
import { colors } from 'utils/theme';
import { useFormik } from "formik";
import auth from "utils/auth";


const useStyles = makeStyles((theme)=>({
  root:{
      display: "flex",
      overflow:"hidden",
  },
  wrapper:{
      minHeight: '100vh'
  },
  card:{
      color: colors.cl_navy,
      width: '50vh',
      marginTop: "1vh",
      boxShadow: '0px 0px 5px 2px '+colors.cl_shadow,  
  },
  title:{
      marginTop: "5vh",
      fontSize: 18,
      width:"30vh",
      fontWeight: "bold"
  },
  signin_button:{
      color:colors.cl_white,
      backgroundColor:colors.cl_navy,
      width: "30vh",
      margin: "0vh 0vh 5vh 5vh"
  },
  container:{
    minHeight: "80vh"
  },
  error:{
    color: colors.cl_error,
    fontSize: 10,
    height: 10,
  },
}));

function switchTabs(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

function ChangePassword(props) {
  const classes = useStyles();

  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const { handleChange, handleSubmit, values, errors} = useFormik({
    initialValues: {
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: ChangepasswordValidator,
    async onSubmit(values, { resetForm, setErrors }) {
      setLoading(true);
        var response = await auth.resetPassword(values.oldpassword,values.newpassword);
        console.log(response); 
    },
  });

  useEffect(
    function () {
      setLoading(false);
    },
    [isLoading]
  );

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
          <Grid 
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{marginTop: "5vh"}}
          >
            <Grid items xs>
              <Tabs
                value={value}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                >
                  <Tab label="General Settings" {...switchTabs(0)} />
                  <Tab label="Reset Password" {...switchTabs(1)} />
              </Tabs>
            </Grid>
            <Grid item xs className={classes.container}>
              <TabPanel value={value} index={0}>
                General settings not available
              </TabPanel>
              <TabPanel value={value} index={1}>
                <form onSubmit={handleSubmit}>
                  <Card className={classes.card}>
                    <Grid
                      container
                      justify="center"
                      alignItems="center"
                      spacing={5}
                    >
                      <Grid item xs={5}>
                        <Typography className={classes.title}>
                          Reset Password
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          variant="outlined"
                          label="Old Password"
                          name="oldpassword"
                          type="password"
                          autoComplete="off"
                          value={values.oldpassword}
                          onChange={handleChange}
                          error={errors.oldpassword ? true : false}
                        />
                        <div className={classes.error}>
                          {errors.oldpassword ? errors.oldpassword : null}
                        </div>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          variant="outlined"
                          label="New Password"
                          name="newpassword"
                          type="password"
                          autoComplete="off"
                          value={values.newpassword}
                          onChange={handleChange}
                          error={errors.newpassword ? true : false}
                        />
                        <div className={classes.error}>
                          {errors.newpassword ? errors.newpassword : null}
                        </div>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          variant="outlined"
                          label="Confirm Password"
                          name="confirmpassword"
                          type="password"
                          autoComplete="off"
                          value={values.confirmpassword}
                          onChange={handleChange}
                          error={errors.confirmpassword ? true : false}
                        />
                        <div className={classes.error}>
                          {errors.confirmpassword ? errors.confirmpassword : null}
                        </div>
                      </Grid>
                      <Grid item xs={10}>
                        <Button className={classes.signin_button} type="submit">
                          Confirm
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </form>
              </TabPanel>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default ChangePassword;