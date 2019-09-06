import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { TotalUsers, CouponActivity, LineActivity } from './Components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    margin: '0',
    width: '100%',
  },
}));

const BusinessDashboard = props => {
  const classes = useStyles();
  const { batchData } = props;

  const getArrays = objectArray => {
    let results = { months: [], created: [], claimed: [], redeemed: [] };
    objectArray.forEach(element => {
      results.months.push(element.month_created);
      results.created.push(element.batch_count);
    });
    return results;
  };
  let batchActivity = getArrays(batchData);

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
          <LineActivity
            data={batchActivity.created.reverse()}
            labels={batchActivity.months.reverse()}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BusinessDashboard;
