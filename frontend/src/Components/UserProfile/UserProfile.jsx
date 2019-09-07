import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { CustomerProfile, BusinessProfile } from './Components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const UserProfile = props => {
  const classes = useStyles();
  const { user } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {user.role === 'customer' && (
          <div>
            <Grid item lg={4} md={6} xl={4} xs={12}>
              <CustomerProfile currentUser={props.currentUser} />
            </Grid>
            <Grid item lg={8} md={6} xl={8} xs={12}></Grid>
          </div>
        )}
        {user.role === 'business' && (
          <div>
            <Grid item lg={4} md={6} xl={4} xs={12}>
              <BusinessProfile currentUser={props.currentUser} />
            </Grid>
            <Grid item lg={8} md={6} xl={8} xs={12}></Grid>
          </div>
        )}
      </Grid>
    </div>
  );
};

export default UserProfile;
