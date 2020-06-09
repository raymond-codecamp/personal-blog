import React from 'react';
import {
    Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


function CustomSnackBar(props)
{
    const {openSnackBar, handleClose, message, type} = props;
    return(
        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    );
}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default CustomSnackBar;