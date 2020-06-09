import React, { 
    useState, 
    useEffect
} from 'react';
import {  
    Grid,
    Typography,
    Button,
    TextField,
} from "@material-ui/core";
import {CURRENT_USER,DASHBOARD} from 'utils/constants';
import {Redirect} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {SignInValidator} from 'utils/validation';
import { useFormik} from 'formik';
import Auth from 'utils/auth';
import Header from 'components/header';
import CustomModal from 'components/modal';
import Session from 'utils/sessionstorage';
import {useStyles} from './style';

function SignIn(props)
{
    const  classes = useStyles();

    const [isLoading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    
    const handleModalOpen= ()=>{
        setModalOpen(!modalOpen);
    };
    
    const {handleChange, handleSubmit, values} = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        validationSchema : SignInValidator,
        onSubmit(values, {resetForm,setErrors})
        {
            setLoading(true);
            Auth
            .signIn(values.email, values.password)
            .then(function(user){
                Session.setSession(CURRENT_USER,user.user.email);
                setTimeout(function(){
                    props.history.push(DASHBOARD);
                    setLoading(false);
                },100);
               
            })
            .catch(function(error){
                console.log(error);
                resetForm({values: ''});
                setLoading(false);
            });

        }
    });
    
    useEffect(function(){
        if(!values.email && !values.password)
        {
            setLoading(false);
        }
        
    },[isLoading,values.email,values.password]);
    
    return(
        <div className={classes.root}>
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
                <>
                    <Header/>
                    <Grid
                    container
                    alignItems="center"
                    justify="center"
                    direction="column"
                    className={classes.wrapper}
                    >
                        <form onSubmit={handleSubmit}>
                            <Grid 
                                container
                                justify="center"
                                alignItems="center"
                                spacing={5}
                                className={classes.card}
                            >
                                <Grid item xs={5}>
                                    <Typography className={classes.title}>
                                        Sign In
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        variant="outlined"
                                        label="E-mail"
                                        name="email"
                                        autoComplete="off"  
                                        value={values.email}  
                                        onChange={handleChange}                        
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        variant="outlined"
                                        label="Password"
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        value={values.password}  
                                        onChange={handleChange}                          
                                    />
                                </Grid>
                                <Grid item xs={10}>
                                    <Button className={classes.signin_button} type="submit">
                                        Sign In
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <CustomModal 
                        open={modalOpen}
                        callback={handleModalOpen}
                        title="hai"
                        content="poda"
                    /> 
                </>
            }
        </div>
    );
}
export default SignIn;