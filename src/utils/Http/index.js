import axios from 'axios';
import {API_BASE_URL} from 'utils/constants';

class Http
{
    get(endpoint)
    {
        return axios.get(API_BASE_URL+endpoint);
    }
    post(endpoint, formBody)
    {
        return axios.post(API_BASE_URL+endpoint, formBody);
    }
    put(endpoint, formBody)
    {
        return axios.put(API_BASE_URL+endpoint, formBody);
    }
    delete(endpoint, formBody)
    {
        return axios.delete(API_BASE_URL+endpoint, formBody);
    }
    postFile(endpoint, formBody)
    {
        return axios.post(API_BASE_URL+endpoint,formBody,{headers:{"enctype":"multipart/form-data"}});
    }    
}
export default new Http();
