import React, {useEffect} from 'react';
import {Grid,
    Typography,
    Divider
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import image from 'assets/images/logo.png';
import SearchBar from 'components/searchbar';
import NavigationBar from './navigation';
import SocialMedia from './socialmedia';
import Introduction from './intro';
import SearchPanel from './searchpanel';
import PostList from './postlist';
import {
    SET_LOADING,
    SET_POSTS,
} from 'utils/constants';
import Http from 'utils/Http';
import {connect} from 'react-redux';
import {useStyles} from './style';

function Home(props)
{
    const classes = useStyles();
    const {isLoading,postsList,isSearch,setLoading,setPosts} = props;
    useEffect(function(){
        if(postsList.length === 0)
        {
            loadData();
        }
    });

    async function loadData(){
        var response = await Http.get('/allPostList');
        if(response.status ===200)
        setPosts(response.data.docs);
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
                <Grid 
                    container  
                    direction="column"
                    alignItems="flex-end" 
                    justify="space-evenly"
                    style={{height: "5vh",minWidth: "80vh"}}
                >
                    <SocialMedia />
                </Grid>
                    <NavigationBar />
                <Grid 
                    container  
                    alignItems="center" 
                    justify="center"
                    style={{minHeight: "25vh"}}
                >
                    <Grid item>
                        <img alt="Logo" className={classes.image} src={image}/>
                    </Grid>
                </Grid>
                <Introduction />
                <Grid 
                    container  
                    alignItems="center" 
                    justify="space-evenly"
                    style={{minHeight: "10vh"}}
                >
                    <Grid
                       item
                    >
                        <Typography
                            variant="h3"
                        >
                            What's New ?
                        </Typography>
                    </Grid>  
                </Grid>
                <Grid 
                    container  
                    alignItems="center" 
                    justify="flex-start"
                    style={{minHeight: "5vh",minWidth: "10vh"}}
                >
                    <Grid
                        item
                        xs
                    >
                        <Typography
                            variant="h3"
                        >
                            <Divider variant="middle"/>
                        </Typography>
                    </Grid>  
                </Grid>
                <Grid 
                    container  
                    alignItems="center" 
                    justify="center"
                    style={{minHeight: "20vh",minWidth: "50vh"}}
                >
                    <Grid
                        item
                    >
                        <SearchBar tag="Search Posts" />
                    </Grid>  
                </Grid>
                <Grid 
                    container  
                    alignItems="center" 
                    justify="center"
                >
                    <Grid
                        item
                    >
                        {isSearch ? 
                            <SearchPanel/>
                        :
                           <PostList/>
                        }
                    </Grid>  
                </Grid>
            </div>
        }
        </>
    );
}
function mapStateToProps(state)
{
    return {
        isLoading: state.isLoading,
        postsList: state.postsList,
        isSearch: state.isSearch,
    };
}
function mapDispatchToProps(dispatch)
{
    return {
        setLoading: (value)=>dispatch({type: SET_LOADING,payload:value}),
        setPosts: (value)=>dispatch({type:SET_POSTS,payload:value}),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);