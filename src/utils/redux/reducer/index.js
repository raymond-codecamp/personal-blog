import {
    SET_UPLOAD,
    SET_UPLOAD_PROGRESS,
    SET_LOADING,
    SET_PUBLICURL,
    SET_POSTS,
    SET_SEARCH_RESULT,
    SET_SEARCH_KEY,
    SET_SEARCH_STATUS,
    SET_POST_CONTENT,
    SET_VIEW_POST

} from 'utils/constants';

const initialValues = {
    isLoading: true,
    uploadPercent: 0,
    isUpload: false,
    publicURL: '',
    isSearch: false,
    postsList: [],
    searchData: [],
    searchKey: '',
    viewContent: false,
    postContent: '',
};

export const blogReducer = (state = initialValues, action) => 
{
    switch(action.type)
    {
        case SET_UPLOAD_PROGRESS : return {
            ...state,
            uploadPercent: action.payload,
        }; 
        case SET_UPLOAD: return{
            ...state,
            isUpload: action.payload,
        }; 
        case SET_LOADING : return{
            ...state,
            isLoading: action.payload,
        };
        case SET_PUBLICURL : return{
            ...state,
            publicURL: action.payload,
        };
        case SET_POSTS : return{
            ...state,
            postsList: action.payload,
        };
        case SET_SEARCH_STATUS : return{
            ...state,
            isSearch: action.payload,
        };
        case SET_SEARCH_RESULT : return{
            ...state,
            searchData: action.payload,
        };
        case SET_SEARCH_KEY : return{
            ...state,
            searchKey: action.payload,
        };
        case SET_VIEW_POST : return{
            ...state,
            viewContent: action.payload,
        };
        case SET_POST_CONTENT : return{
            ...state,
            postContent: action.payload,
        };
        default: return state;
    }
}