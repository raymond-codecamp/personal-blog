import {createStore} from 'redux';
import {blogReducer} from 'utils/redux/reducer';


export const store = createStore(blogReducer);
