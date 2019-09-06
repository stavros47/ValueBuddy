import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { CustCouponActivity, FavouritePie } from './Components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    margin: '0',
    width: '100%',
  },
}));

const CustomerDashboard = props => {
  const classes = useStyles();
  const { monthly, favorites } = props;

  const getMonthlyArrays = objectArray => {
    let results = { months: [], claimed: [], redeemed: [] };
    objectArray.forEach(element => {
      results.months.push(element.month_claimed);
      results.claimed.push(element.coupons_claimed);
      results.redeemed.push(element.coupons_redeemed);
    });
    return results;
  };

  const getFavoriteArrays = objectArray => {
    let results = { businesses: [], coupons: [] };
    objectArray.forEach(element => {
      results.businesses.push(element.business);
      results.coupons.push(element.coupons);
    });
    return results;
  };

  let monthlyData = getMonthlyArrays(monthly);
  let favoriteData = getFavoriteArrays(favorites);

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="space-between" alignItems="center" spacing={1}>
        {/* <Grid item xs={12} md={4}>
           <TotalUsers total={props.total} /> 
        </Grid> */}
        <Grid item xs={12} sm={12} md={8}>
          <FavouritePie labels={favoriteData.businesses} data={favoriteData.coupons} />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <CustCouponActivity
            labels={monthlyData.months.reverse()}
            dataClaimed={monthlyData.claimed.reverse()}
            dataRedeemed={monthlyData.redeemed.reverse()}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerDashboard;
