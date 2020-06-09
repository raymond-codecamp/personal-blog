/* API Constants*/
export const API_BASE_URL = 'https://pip-api.web.app';

/* Routes */

export const HOME = '/';
export const SIGNUP = '/signup'
export const SIGNIN = '/signin';
export const DASHBOARD = '/dashboard';


/*Redux constants*/
export const SET_LOADING = "SET_LOADING";
export const SET_UPLOAD_PROGRESS = "SET_UPLOAD_PROGRESS";
export const SET_UPLOAD = "SET_UPLOAD";
export const SET_PUBLICURL = "SET_PUBLICURL";
export const SET_POSTS = "SET_POSTS";
export const SET_SEARCH_STATUS = "SET_SEARCH_STATUS";
export const SET_SEARCH_RESULT = "SET_SEARCH_RESULT";
export const SET_SEARCH_KEY = "SET_SEARCH_KEY";
export const SET_POST_CONTENT = "SET_POST_CONTENT";
export const SET_VIEW_POST = "SET_VIEW_POST";

/*Validation policies*/
export const EMAIL_FORMAT = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_POLICY = /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$/;
export const URL = /\bhttps?:\/\/\S+"/gi;


/*error messages*/
export const REQUIRED_ERROR = "Field must have a value.";
export const EMAIL_ERROR = "Invalid e-mail format.";
export const PASSWORD_POLICY_ERROR = "Must have one Capital letter, one Special character and one Number";
export const PASSWORD_MISSMATCH_ERROR = "The passwords doesn't match.";
export const EXISTING_ERROR = "The user on this email already exists.";
export const ACCEPT_TERMS_ERROR = "You must agree to continue.";
export const SIGNUP_ERROR = "Couldn't signup the user please try again.";
export const PUBLISH_ERROR = "Unable to publish the blog post.";
export const NETWORK_ERROR = "Something went wrong with the network.";

/*Success messages*/
export const SIGNUP_SUCCESS = "SignUp successful.";

/*Session Constants*/

export const CURRENT_USER = 'currentUser';

/*Snackbar Constants*/

export const SUCCESS = "success";
export const ERROR =  "error";

/*Firebase Constants*/

export const TOKEN = require('./credentials.json');
export const STATE_CHANGED = "state_changed";


/*Database Constants*/
export const DB_SIGNUP = "signup";
export const DB_BLOGPOSTS = 'blogposts';

/*Function Constants*/
export const FILE_UPLOAD = "FILE_UPLOAD";
export const NAME_EDIT = "NAME_EDIT";
export const DESC_EDIT = "DESC_EDIT";