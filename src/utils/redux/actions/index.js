import {
    SET_UPLOAD,
    SET_UPLOAD_PROGRESS,
    SET_LOADING

} from 'utils/constants';

export const uploadProgressAction = (value)=>{
    return {
        action: SET_UPLOAD_PROGRESS,
        payload: value,
    };
};
export const uploadCompleteAction = (value)=>{
    return {
        action: SET_UPLOAD,
        payload: value,
    };
};
export const loadingAction = (value)=>{
    return {
        action: SET_LOADING,
        payload: value,
    };
};