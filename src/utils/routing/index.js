import React,{useState} from 'react';
import { Route, Redirect} from 'react-router-dom';
import Auth from 'utils/auth';
import {SIGNIN,CURRENT_USER} from 'utils/constants';
import {Grid} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

function ProtectedRoute({component:Component, ...rest})
{
    const [usr,getUsr] = useState({});
    const [isLoading,setLoading] = useState(true);
    Auth.getApp().auth().onAuthStateChanged(function(user) {
        getUsr(user);
        setLoading(false);
    });
        return isLoading ? 
            <Grid 
                container
                alignItems="center"
                justify="center"
                style={{minHeight: "100vh"}} 
            >
               <CircularProgress color="primary" /> 
            </Grid>
            : <Route
            {...rest}
            render={
                (props)=>(
                    usr!==null ? 
                    <Component {...props}/>
                    :
                    <Redirect to={SIGNIN}/>
                )
            }
        />
   
}
export default ProtectedRoute;