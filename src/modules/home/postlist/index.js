import React from 'react';
import {
    SET_LOADING,
    SET_POST_CONTENT,
    SET_VIEW_POST
} from 'utils/constants';
import {
    Grid,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {colors} from 'utils/theme';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme)=>({
    imageContainer:{
        overflow: "hidden",
        width: "85vh",
        height: "25vh",
    },
    image:{
        height: "25vh",
        width: "40vh"
    },
    card:{
        width: "40vh",
        height: "55vh",
        margin: "3vh"
    },
    titleWrapper: {
        padding: "4vh",
        minWidth:"40vh"
    },
    postedOn:{
        fontSize: 10,
        color: colors.cl_medium_gray,
    },
    postedBy:{
        fontSize: 10,
        width: "10vh",
        color: colors.cl_medium_gray,
    },
    like:{
        color: colors.cl_pink,
        fontSize: 25,
        padding: "1vh"
    },
    comment:{
        color: colors.cl_mediusm_grey,
        fontSize: 25,
        padding: "1vh"
    },
    share:{
        color: colors.cl_light_blue,
        fontSize: 25,
        padding: "1vh"
    },
    view:
    {   
        color: colors.cl_olive,
        fontSize: 25,
        padding: "1vh",
    },
    iconWrapper:{
        textAlign: "center"
    }
}));

function PostList(props)
{
    const { isLoading, postsList} = props; 
    const classes = useStyles();
    return(
        <>
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

            </div>
        }
        </>
    );
}
function mapStateToProps(state){
    return {
        isLoading: state.isLoading,
        postsList: state.postsList,
    };
}
function mapDispatchToProps(dispatch)
{
    return{
        setLoding : (value)  =>  dispatch({ type : SET_LOADING, payload : value }),
        setPostContent : (value) => dispatch({ type : SET_POST_CONTENT, payload : value }),
        setViewPost : (value)   =>  dispatch({ type : SET_VIEW_POST, payload : value}),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PostList);