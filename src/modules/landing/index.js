import React, {useState,useEffect} from 'react';
import {
  Grid,
  Tabs,
  Tab,
  Box,
  Typography,
  Button
} from '@material-ui/core';
import {CURRENT_USER} from 'utils/constants';
import {useStyles} from './style';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Auth from 'utils/auth';
import Session from 'utils/sessionstorage';
import Header from 'components/header';
import Profile from './profile';
import ChangePassword from './changepassword';
import Editor from './editor';
import Posts from './posts';

function switchTab(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}



function DashBoard(props)
{
  const [isLoading,setLoading] = useState(true);
  const [value, setValue] = useState(0);


  function handleChange(event, newValue){
    setValue(newValue);
  }
  
  const classes = useStyles();

  const signOut = ()=>{
    Auth.signOut();
    Session.deleteSession(CURRENT_USER);
    props.history.push('/');
  };
  useEffect(function(){
    setLoading(false);
  },[isLoading]);


  return(
    <div>
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
          <Header />
          <Grid 
            container
            justify="flex-start"
            alignItems="stretch"
            style={{height:"100vh",display:"flex",flexGrow:1,}}
          >
              <Grid
                item
                sm={2}
                style={{flexShrink:0,}}
              >
                  <Grid 
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{height: "100vh"}}
                    className={classes.tabRoot}
                  >
                     <VerticalTabs
                      orientation="vertical"
                      variant="scrollable"
                      value={value}
                      onChange={handleChange}
                      aria-label="Vertical tabs example"
                      className={classes.tabs}
                    >
                      <CustomTab label="Profile" {...switchTab(0)} />
                      <CustomTab label="Create Post" {...switchTab(1)} />
                      <CustomTab label="My Posts" {...switchTab(2)} />
                      <CustomTab label="Settings" {...switchTab(3)} />
                    </VerticalTabs>
                    <Button
                      onClick={signOut}
                    >
                      Sign Out
                    </Button>
                  </Grid>
              </Grid>
              <Grid
                item
                sm
                className={classes.drawer}
              >
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={{height:"80vh"}}
                  >
                    <TabPanel value={value} index={0}>
                      <Profile />
                    </TabPanel>
                    <TabPanel value={value} index={1} style={{flexGrow: 1,overfow:"scroll"}}>
                      <Editor />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                      <Posts/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                      <ChangePassword/>
                    </TabPanel>
                  </Grid>
              </Grid>
          </Grid>
        </>
      }
    </div>
  );
}
const VerticalTabs = withStyles(theme => ({
  flexContainer: {
    flexDirection: 'column',
  },
  indicator: {
    display: 'none',
  },
  tabsRoot: {
    textAlign: 'left'
  }

}))(Tabs)
const CustomTab = withStyles(theme => ({

  root: {
  borderRight: '2px solid lightgray',
  justify:"flex-start",


  },
  selected: {
    color: '#4ABDAC',
    borderRight: '3px solid #4ABDAC',


  },
  label: {
    fontSize: 20,
    textAlign: "left",
    textTransform: 'initial',
  },


}))(Tab);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
export default DashBoard;