import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { TotalUsers, CouponActivity, BatchActivity } from './Components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    margin: '0',
    width: '100%',
  },
}));

const Dashboard = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
        <Grid item xs={12} md={4}>
          <TotalUsers total={props.total} />
        </Grid>
        <Grid item xs={12} md={8}>
          <CouponActivity couponData={props.couponData} />
        </Grid>
        <Grid item xs={12} md={8}>
          <BatchActivity batchData={props.batchData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
