import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
//Material-ui components
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline, Divider } from '@material-ui/core';
//Components
import MenuAppBar from './MenuAppBar';
import DrawerItems from './DrawerItems';
import { PrivateRoute } from './PrivateRoute';
import Batches from './Batches';
import Templates from './Templates';
import Coupons from './Coupons';
import CouponPage from './Coupons/CouponPage';
import Profile from './Profile';
import BrowseBatches from './Batches/BrowseBatches';
import Category from './Batches/Category';
import BatchPage from './Batches/BatchPage';
import Redeem from './Redeem';
import { CustomerDashboard, BusinessDashboard } from './Dashboard';
import { UserProfile } from './UserProfile';

import AuthHelperMethods from './AuthHelperMethods';

const Auth = new AuthHelperMethods('http://localhost:3001');

const drawerWidth = 340;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  // drawer: {
  //   [theme.breakpoints.up("sm")]: {
  //     width: drawerWidth,
  //     flexShrink: 0
  //   }
  // },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: '0 3px 5px 2px rgb(128,128,128, 0.4)',
    flexShrink: 0,
  },
  content: {
    flexGrow: 8,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

function Main(props) {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [resourcePath, setResourcePath] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  /*Business specific state */
  const [batchData, setBatchData] = useState([]);
  const [couponData, setCouponData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [templates, setTemplates] = useState([]);
  /*Customer specific State */
  const [customerFavorites, setCustomerFavorites] = useState([]);
  const [customerExpiring, setCustomerExpiring] = useState([]);
  const [customerMonthly, setCustomerMonthly] = useState([]);

  const { role, role_id } = props.user;

  if (!resourcePath) {
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

  useEffect(() => {
    Auth.fetch({
      method: 'get',
      url: `http://localhost:3001/${resourcePath}`,
      data: {},
    })
      .then(res => {
        console.log('user:', res);
        if (res) {
          if (role === 'admin') {
            setCurrentUser({
              ...res.admin,
              ...props.user,
            });
          } else if (role === 'customer') {
            setCurrentUser({
              ...res.customer,
              ...props.user,
            });
            if (res.monthly) {
              setCustomerMonthly(res.monthly);
            }
            if (res.expiring) {
              setCustomerExpiring(res.expiring);
            }
            if (res.favorites) {
              setCustomerFavorites(res.favorites);
            }
          } else if (role === 'business') {
            setCurrentUser({
              ...res.business,
              ...props.user,
            });
            if (res.batch_data) {
              setBatchData(res.batch_data);
            }
            if (res.coupon_data) {
              setCouponData(res.coupon_data);
            }
            if (res.total_customers) {
              setTotalUsers(res.total_customers);
            }
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [props.user, resourcePath, role]);

  useEffect(() => {
    if (role === 'business') {
      Auth.fetch({
        method: 'get',
        url: `http://localhost:3001/${resourcePath}/Templates`,
        data: {},
      })
        .then(res => {
          console.log('templates:', res.templates);
          if (res.templates) {
            setTemplates(res.templates);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [resourcePath, role]);

  const getTemplates = () => {
    return Auth.fetch({
      method: 'get',
      url: `http://localhost:3001/${resourcePath}/Templates`,
      data: {},
    });
  };

  const createTemplate = template => {
    Auth.fetch({
      method: 'post',
      url: `http://localhost:3001/${resourcePath}/Templates`,
      data: { ...template },
    })
      .then(res => {
        console.log(res);
        if (res.template) {
          setTemplates([...templates, res.template[0]]);
          console.log('+templates:', templates);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTemplate = async updatedTemplate => {
    console.log('tosend:', updatedTemplate);
    try {
      let updated = await Auth.fetch({
        method: 'put',
        url: `http://localhost:3001/${resourcePath}/Templates/${updatedTemplate.template_id}`,
        data: { ...updatedTemplate },
      });

      if (updated.template[0].update_template) {
        getTemplates().then(res => {
          console.log('templates:', res.templates);
          if (res.templates) {
            setTemplates(res.templates);
          }
        });
      }
    } catch (err) {
      console.log(err, 'Error updating template.');
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <MenuAppBar handleLogout={props.handleLogout} handleDrawerToggle={handleDrawerToggle} />

        <Drawer
          open={drawerOpen}
          onClose={handleDrawerToggle}
          variant="temporary"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}>
          <Profile currentUser={currentUser} handleLogout={props.handleLogout} />
          <div className={classes.toolbar} />
          <Divider />
          <DrawerItems handleDrawerToggle={handleDrawerToggle} role={role} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {role === 'customer' && (
            <>
              <PrivateRoute
                exact
                path="/"
                component={CustomerDashboard}
                resourcePath={resourcePath}
                currentUser={currentUser}
                favorites={customerFavorites}
                expiring={customerExpiring}
                monthly={customerMonthly}
              />
              <PrivateRoute
                exact
                path="/Discover"
                component={BrowseBatches}
                resourcePath={resourcePath}
                currentUser={currentUser}
              />
              <PrivateRoute
                exact
                path="/Discover/:categoryName"
                component={Category}
                currentUser={currentUser}
              />
              <PrivateRoute
                exact
                path="/Discover/:categoryName/:batchID"
                component={BatchPage}
                currentUser={currentUser}
                resourcePath={resourcePath}
              />
              <PrivateRoute
                exact
                path="/Coupons"
                component={Coupons}
                resourcePath={resourcePath}
                currentUser={currentUser}
              />
              <PrivateRoute
                exact
                path="/Coupons/:couponID"
                component={CouponPage}
                resourcePath={resourcePath}
                currentUser={currentUser}
              />
              <PrivateRoute
                exact
                path="/profile"
                component={UserProfile}
                resourcePath={resourcePath}
                user={props.user}
                currentUser={currentUser}
              />
            </>
          )}

          {role === 'business' && (
            <>
              <PrivateRoute
                exact
                path="/"
                component={BusinessDashboard}
                resourcePath={resourcePath}
                currentUser={currentUser}
                batchData={batchData}
                couponData={couponData}
                total={totalUsers}
              />
              <PrivateRoute
                exact
                path="/Templates"
                component={Templates}
                resourcePath={resourcePath}
                currentUser={currentUser}
                createTemplate={createTemplate}
                updateTemplate={updateTemplate}
                templates={templates}
              />
              <PrivateRoute
                exact
                path="/Batches"
                component={Batches}
                resourcePath={resourcePath}
                currentUser={currentUser}
                templates={templates}
              />
              <PrivateRoute
                exact
                path="/Batches/:batchID"
                component={BatchPage}
                resourcePath={resourcePath}
                currentUser={currentUser}
              />
              <PrivateRoute
                exact
                path="/Redeem"
                component={Redeem}
                resourcePath={resourcePath}
                currentUser={currentUser}
              />
              <PrivateRoute
                exact
                path="/profile"
                component={UserProfile}
                resourcePath={resourcePath}
                user={props.user}
                currentUser={currentUser}
              />
            </>
          )}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default Main;
