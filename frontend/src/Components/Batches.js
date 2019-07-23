import React, {useState, useEffect} from 'react';
import {Grid, Typography} from '@material-ui/core';

import AuthHelperMethods from './AuthHelperMethods';
import BatchItem from './BatchItem';

const Auth = new AuthHelperMethods("http://localhost:3001"); 

export default function Batches(props) {
    const [batches,setBatches] = useState([])
   
    useEffect(()=>{        
        
            Auth.fetch({
                method: 'get',
                url: `http://localhost:3001/${props.resourcePath}/Batches`,
                data: {}
            }).then(res => {
                console.log(res.batches);
                if(res.batches){
                    setBatches(res.batches);
                }                
            }).catch(e => {
                console.log(e);
            });       
        
       
    }, [props]);

    return (
        <div>
        <Typography className="section_title" variant="h4">
           Coupon Batches
        </Typography>           
             <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
             >
              {batches.map((batch) => (
                <BatchItem key={batch.batch_id} batch={batch}/>              
            ))}
            </Grid>
        </div>      
    );
}