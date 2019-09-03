import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// Budget,
//   TasksProgress,
//   TotalProfit,
//   LatestSales,
//   UsersByDevice,
//   LatestProducts,
//   LatestOrders,
import TotalUsers from './Components/TotalUsers';
import LatestSales from './Components/LatestSales';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Budget />
        </Grid> */}
        <Grid item md={6} xs={12}>
          <TotalUsers />
        </Grid>
        <Grid item md={6} xs={12}>
          <TotalUsers />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <LatestSales />
        </Grid>
        {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TasksProgress />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProfit />
        </Grid>
        
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <UsersByDevice />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <LatestProducts />
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <LatestOrders />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Dashboard;
