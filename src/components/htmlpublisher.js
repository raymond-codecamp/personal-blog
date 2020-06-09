import React,{useState,useEffect} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function HTMLPublisher(props)
{
    const [isLoading,setLoading] = useState(true);

    const {data} = props;

    useEffect(function(){
        setLoading(false);
    },[isLoading]);

    return(
        <>
            {isLoading ? 
             <>
                <CircularProgress color="primary" />
             </>
             :
             <>
                <div>
                    <div dangerouslySetInnerHTML={ { __html: data } }></div>
                </div>
             </>       
            }
        </>
    );
}
export default HTMLPublisher;