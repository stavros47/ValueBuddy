import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Grid, Typography, AppBar, Tabs, Tab } from '@material-ui/core';
import TabPanel from '../TabPanel';
// import CouponItem from "./CouponItem";
import BatchInstance from '../Batches/BatchInstance';
import { parseISO, isAfter } from 'date-fns';
import AuthHelperMethods from '../AuthHelperMethods';

const Auth = new AuthHelperMethods('http://localhost:3001');

export default function Coupons(props) {
  const [coupons, setCoupons] = useState([]);
  const [value, setValue] = React.useState(0);
  const { match, resourcePath } = props;

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  useEffect(() => {
    Auth.fetch({
      method: 'get',
      url: `http://localhost:3001/${resourcePath}/Coupons`,
      data: {},
    })
      .then(res => {
        console.log(res.coupons);
        if (res.coupons) {
          setCoupons(res.coupons);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [resourcePath]);

  return (
    <div>
      <Typography className="section_title" variant="h4">
        Coupons
      </Typography>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Grid item xs={12}>
          <div>
            <AppBar position="static">
              <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab label="Valid" />
                <Tab label="Expired" />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              {coupons.map(coupon =>
                //
                isAfter(parseISO(coupon.expiry_date), new Date()) ? (
                  <Grid item key={coupon.coupon_id}>
                    <RouterLink to={`${match.url}/${coupon.coupon_id}`}>
                      <BatchInstance
                        description={coupon.description}
                        business_name={coupon.business_name}
                        discount={coupon.discount}
                        discount_type={coupon.discount_type}
                        expiry_date={coupon.expiry_date}
                      />
                    </RouterLink>
                  </Grid>
                ) : null
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {coupons.map(coupon =>
                //
                isAfter(parseISO(coupon.expiry_date), new Date()) ? null : (
                  <Grid item key={coupon.coupon_id}>
                    <BatchInstance
                      description={coupon.description}
                      business_name={coupon.business_name}
                      discount={coupon.discount}
                      discount_type={coupon.discount_type}
                      expiry_date={coupon.expiry_date}
                      isExpired={true}
                    />
                  </Grid>
                )
              )}
            </TabPanel>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
