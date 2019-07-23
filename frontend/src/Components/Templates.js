import React, {useState, useEffect} from 'react';
import AuthHelperMethods from './AuthHelperMethods';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
            <h1>Templates</h1>
            <List>
            {templates.map((template) => (       
                <ListItem key={template.template_id}>                   
                    <ListItemText primary={template.description} />
                </ListItem>                
            ))}
            </List>
            
        </div>      
    );
}