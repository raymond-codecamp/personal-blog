import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {
    SET_SEARCH_RESULT,
    SET_SEARCH_STATUS,
    SET_LOADING
} from 'utils/constants';
import {
    Grid,
    Typgraphy,
    Divider,
    Button,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';

const  useStyles = makeStyles((theme)=>({
    root: {
        display: "flex",
    },
}));

function SearchPanel(props)
{
    const classes = useStyles();
    const {
        searchData,
        searchKey,
        isLoading,
        setSearch,
        setSerachData,
        setLoading
    } = props;
    useEffect(function(){
        if(searchData.legth === 0)
        {
            getSearchData();
        }
    });
    async function getSearchData()
    {
        console.log("received : " + searchKey);
        setLoading(false);
    }
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
                <Button
                    onClick={()=>{
                        setSearch(false);
                    }}
                >Close : {searchKey}</Button>
            </div>
        }
        </>
    );
}
function mapStateToProps(state)
{
    return {
        searchData: state.searchData,
        searchKey: state.searchKey,
        isLoading: state.isLoading,
    };
}
function mapDispatchToProps(dispatch)
{
    return {
        setSerachData: (value)  =>  dispatch({type : SET_SEARCH_RESULT, payload : value}),
        setSearch:  (value) =>  dispatch({ type : SET_SEARCH_STATUS, payload : value}),
        setLoading: (value)  =>  dispatch({type: SET_LOADING, payload: value}),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchPanel);