import React, {
    useState,
    useEffect
}from 'react';
import { useFormik } from 'formik';
import Header from 'components/header';
import http from 'utils/Http';
import Auth from 'utils/auth';
import {SignUpValidator} from 'utils/validation';
import CustomModal from 'components/modal';
import CustomSnackBar from 'components/snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import {colors} from 'utils/theme';
import {
    SUCCESS,
    ERROR,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
} from 'utils/constants';
import {Link} from 'react-router-dom';
import {
    Grid, 
    Typography, 
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Tooltip,
    Snackbar
} from '@material-ui/core';
import { useStyles } from './style';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function SignUp(props)
{
    const classes = useStyles();

    const [isLoading,setLoading] = useState(true);
    const [message,setMessage] = useState();
    const [alertType, setAlertType] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
        
      const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackBar(false);
      };

    const handleModal= ()=>{
        setModalOpen(!modalOpen);
    };

    function errorMessage(errMessage = SIGNUP_ERROR)
    {
        setMessage(errMessage);
        setAlertType(ERROR);
        setOpenSnackBar(true);
        setLoading(false);
    }
    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues:{
            email: "",
            password:"",
            fullName:"",
            confirmPassword:"",
            terms: false,
        },
        validationSchema: SignUpValidator,
        onSubmit(values,{resetForm}){ 
            setLoading(true); 
            Auth.signUp(values.email,values.password)
            .then(function(){
                var user = Auth.authenticate().currentUser;
                user.updateProfile({
                    displayName: values.fullName,
                  })
                  .then(function(){
                    var postData = {
                        fullName: values.fullName,
                        email: values.email
                    };
                    http
                    .post('/saveInfo',postData)
                    .then(function(res){
                        if(res.status===200)
                        {
                            console.log(res);
                            setLoading(false);
                            setMessage(res.data.createMessage);
                            setAlertType(SUCCESS);
                            setOpenSnackBar(true);
                            resetForm({ values : ''});
                        }
                        else{
                            errorMessage();
                        }
                    })
                    .catch(function(error){
                        errorMessage(error.message);
                    });
                  })
                  .catch(function(error){
                    errorMessage(error.message);
                  });
               
            })
            .catch(function(error){
                errorMessage(error.message);
            });       
        }
    });

    useEffect(function(){
        if(!values.email && !values.fullName && !values.password && !values.confirmPassword)
        setLoading(false);
    },[isLoading,values]);
    
    return(
        <div classname={classes.wrapper}>
            {isLoading ? 
                <Grid 
                    container
                    alignItems="center"
                    justify="center"
                    style={{minHeight: "100vh"}} 
                >
                   <CircularProgress color="primary" /> 
                </Grid>
                :
                <div>
                <Header/>
                <Grid container 
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    className={classes.container}
                >
                    <Grid item className={classes.card}>
                        <form onSubmit={handleSubmit}>
                        <Grid 
                        container 
                        alignItems="flex-end" 
                        justify="center" 
                        spacing={4}
                        className={classes.innerWrapper}
                            > 
                                <Grid item xs={12}>
                                    <Typography className={classes.title} variant="subtitle1">
                                        Sign Up
                                    </Typography>
                                </Grid>
                                <Grid xs={5} item>
                                    <TextField 
                                        variant="outlined"
                                        label="Full Name"
                                        name="fullName" 
                                        autoComplete="off"
                                        onChange={handleChange} 
                                        value={values.fullName}
                                        error={errors.fullName ? true : false}
                                    />
                                    <div className={classes.error}>
                                        {errors.fullName ? errors.fullName : null}
                                    </div>
                                </Grid>
                                <Grid xs={5} item>
                                    <TextField 
                                        variant="outlined"
                                        label="E-mail"
                                        name="email"
                                        autoComplete="off"
                                        onChange={handleChange} 
                                        value={values.email}
                                        error={errors.email ? true : false}
                                    />
                                    <div className={classes.error}>
                                        {errors.email ? errors.email : null}
                                    </div>
                                </Grid>
                                <Grid xs={5} item>
                                    <TextField 
                                        variant="outlined"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        onChange={handleChange} 
                                        value={values.password}
                                        error={errors.password ? true : false}
                                    />
                                    <div className={classes.error}>
                                        {errors.password ? errors.password : null}
                                    </div>
                                </Grid>
                                <Grid xs={5} item>
                                    <TextField 
                                        variant="outlined"
                                        label="Confirm"
                                        name="confirmPassword"
                                        autoComplete="off"
                                        type="password"
                                        onChange={handleChange}
                                        value={values.confirmPassword}
                                        error={errors.confirmPassword ? true : false}
                                    />
                                    <div className={classes.error}>
                                        {errors.confirmPassword ? errors.confirmPassword : null}
                                    </div>
                                </Grid>
                                <Grid  xs={9} item>
                                    <Tooltip title="Accept Terms & Conditions" placement="left" >
                                        <FormControlLabel
                                            control={
                                            <Checkbox
                                                checked={values.terms}
                                                onChange={handleChange}
                                                name="terms"
                                                color="primary"
                                                size="medium"
                                            />
                                            }
                                            
                                        />
                                    </Tooltip>
                                    I read and accept <Link>Terms and conditions</Link> of usage.
                                    <div className={classes.error}>
                                        {errors.terms ? errors.terms : null}
                                    </div>
                                </Grid>
                                <Grid  xs={9} item>
                                    <Tooltip title="Complete Signup" placement="top" >
                                        <Button type="submit" className={classes.signup_button}>
                                            Sign Up
                                        </Button>
                                    </Tooltip>
                                </Grid>
                                <Grid  xs={9} item>
                                    <Tooltip title="Password Policy" placement="top">
                                        <Button onClick={handleModal}>
                                            <Typography variant="subtitle1">
                                                Password Policy
                                            </Typography>
                                        </Button>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                <CustomModal 
                    open={modalOpen}
                    callback={handleModal}
                    close={true}
                    title="Alert"
                    content="A paragraph is a series of related sentences developing a central idea, called the topic. Try to think about paragraphs in terms of thematic unity: a paragraph is a sentence or a group of sentences that supports one central, unified idea. Paragraphs add one idea at a time to your broader argument."
                 />
                 <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                    <Alert onClose={handleCloseSnackBar} severity={alertType}>
                        {message}
                    </Alert>
                </Snackbar>
                    
            </div>
            }
        </div>
    );
}

export default SignUp;