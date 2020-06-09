import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {
    HOME,
    SIGNUP,
    SIGNIN,
    DASHBOARD
} from 'utils/constants';
import ProtectedRoute from 'utils/routing';
import Home from 'modules/home';
import SignUp from 'modules/signup';
import SignIn from 'modules/signin';
import DashBoard from 'modules/landing';

function Routes()
{
    return(
        <BrowserRouter>
            <Route path={HOME} exact component={Home} />
            <Route path={SIGNUP} exact component={SignUp}/>
            <Route path={SIGNIN} exact component={SignIn}/>
            <ProtectedRoute path={DASHBOARD} exact component={DashBoard} />
        </BrowserRouter>
    );
}
export default Routes;