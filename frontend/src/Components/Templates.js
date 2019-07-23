import React, {useState, useEffect} from 'react';
import {Grid, Typography} from '@material-ui/core';

import AuthHelperMethods from './AuthHelperMethods';
import TemplateItem from './TemplateItem';

const Auth = new AuthHelperMethods("http://localhost:3001"); 

export default function Templates(props) {
    const [templates,setTemplates] = useState([])
   
    useEffect(()=>{        
        
            Auth.fetch({
                method: 'get',
                url: `http://localhost:3001/${props.resourcePath}/Templates`,
                data: {}
            }).then(res => {
                console.log(res.templates);
                if(res.templates){
                    setTemplates(res.templates);
                }                
            }).catch(e => {
                console.log(e);
            });       
        
       
    }, [props]);

    return (
        <div>
        <Typography className="section_title" variant="h4">
            Coupon Templates
        </Typography>           
             <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
             >
              {templates.map((template) => (
                <TemplateItem key={template.template_id} template={template}/>              
            ))}
            </Grid>
        </div>      
    );
}