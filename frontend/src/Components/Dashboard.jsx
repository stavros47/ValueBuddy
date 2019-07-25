import React, {useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';

import {PrivateRoute} from './PrivateRoute'
import Batches from './Batches';
import Templates from './Templates';
import BusinessCoupons from './BusinessCoupons';
import CustomerCoupons from './CustomerCoupons';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import MenuAppBar from './MenuAppBar';
import CustomerDrawer from './CustomerDrawer';
import BusinessDrawer from './BusinessDrawer';
import AuthHelperMethods from './AuthHelperMethods';

const Auth = new AuthHelperMethods("http://localhost:3001"); 

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: '0 3px 5px 2px rgb(128,128,128, 0.4)'
  },
  content: {
    flexGrow: 8,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));



function Dashboard(props) {
    const classes = useStyles();
    const [resourcePath, setResourcePath] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const {role, role_id} = props.user;

    if(!resourcePath){
        switch (role) {
            case 'customer':
                setResourcePath(`Customers/${role_id}`);
                break;
            case 'business':
                setResourcePath(`Business/${role_id}`);
                break;
            case 'admin':
                setResourcePath(`Admin/${role_id}`);
                break;
            default:
                console.log('Invalid Role');
                break;
        }
    }  
    

    useEffect(()=>{
        //setPath();
        
        Auth.fetch({
            method: 'get',
            url: `http://localhost:3001/${resourcePath}`,
            data: {}
        }).then(res => {
          console.log(res);           
            if(res){
               if(role === 'admin'){
                   setCurrentUser({
                    ...res.admin,
                    ...props.user
                   });
               }else if(role === 'customer'){
                    setCurrentUser({
                        ...res.customer,
                        ...props.user
                    });
               }else if(role === 'business'){
                    setCurrentUser({
                        ...res.business,
                        ...props.user
                    });
                }
            }                
        }).catch(e => {
            console.log(e);
        });
       
    }, [props.user, resourcePath, role]);
 
    return (
        <BrowserRouter>
        <div className={classes.root}>
        <CssBaseline />
        <MenuAppBar currentUser={currentUser} handleLogout={props.handleLogout}/>           
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          {role === 'customer' && <CustomerDrawer/>}
          {role === 'business' && <BusinessDrawer/>}          
          <Divider/>
        </Drawer>
        <main className={classes.content}>             
          <div className={classes.toolbar} />
          {role === 'customer' &&
              <>
               <PrivateRoute exact path ='/Coupons' 
               component={CustomerCoupons}
               resourcePath={resourcePath}
               currentUser={currentUser}           
              />
              </>
          } 

          {role === 'business' &&
          <>   
          <PrivateRoute exact path ='/Templates' 
            component={Templates}
            resourcePath={resourcePath}
            currentUser={currentUser}            
          />
            <PrivateRoute exact path ='/Batches' 
            component={Batches}
            resourcePath={resourcePath}
            currentUser={currentUser}           
          />
              <PrivateRoute exact path ='/Coupons' 
            component={BusinessCoupons}
            resourcePath={resourcePath}
            currentUser={currentUser}           
          />
          </>
        }
        </main>
       
      </div>
      </BrowserRouter>
    );
}
  
  export default Dashboard;