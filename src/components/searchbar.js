import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import InputBase from '@material-ui/core/InputBase';
import {
  SET_LOADING,
  SET_SEARCH_KEY,
  SET_SEARCH_STATUS
} from 'utils/constants';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Http from 'utils/Http';
import {colors} from 'utils/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: "0px 0px 5px 2px "+colors.cl_shadow,
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  icon:{
    fontSize: 25,
  }
}));

function SearchBar(props) {
    const {tag} = props;
    const classes = useStyles();
    const {isLoading, setSearch, setSearchKey, setLoading} = props;
    const [key, setKey] = useState();
    function handleChangeKey(event)
    {
      setKey(event.target.value);
      console.log(key);
    }
    async function handleClickSubmit()
    {
      if(key)
      {
        setLoading(true);
        setSearch(true);
        var query = key.toUpperCase();
        let response = await Http.get(`/searchWithTag/${query}`);
        console.log(response);
        setLoading(false);
        setKey('');
      }
    }
  return (
    <Card component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon className={classes.icon}/>
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder={tag}
        inputProps={{ 'aria-label': tag }}
        onChange={handleChangeKey}
        value={key}
      />
      <IconButton 
        className={classes.iconButton} 
        aria-label="search"
        onClick={handleClickSubmit}
      >
        <SearchIcon className={classes.icon}/>
      </IconButton>
    </Card>
  );
}
function mapStateToProps(state)
{
  return {
    isloading: state.isLoading,
  };
}
function mapDispatchToProps(dispatch)
{
  return {
    setSearch : (value)  =>  dispatch({ type : SET_SEARCH_STATUS, payload : value}),
    setSearchKey : (value)  =>  dispatch({ type : SET_SEARCH_KEY, payload : value}),
    setLoading : (value) => dispatch({ type : SET_LOADING, payload : value}),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar); 
