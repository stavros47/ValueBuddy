import React, { useState, useEffect } from 'react';

import {
  Grid,
  Typography,
  Paper,
  Tooltip,
  IconButton,
  Divider,
  Chip,
  Avatar,
  Button,
} from '@material-ui/core';

import { CardGiftcard, Place, ArrowBack } from '@material-ui/icons';

import ExpireDate from './ExpireDate';
import AuthHelperMethods from '../../AuthHelperMethods';

const Auth = new AuthHelperMethods('http://localhost:3001');
export default function CouponPage(props) {
  const [batch, setBatch] = useState({});
  const [isClaimed, setIsClaimed] = useState(props.isClaimed || false);
  const [couponID, setCouponID] = useState(props.CouponID || null);
  const [coupon, setCoupon] = useState({});

  //Get the initial batch information.
  useEffect(() => {
    if (isClaimed && couponID) {
      // setTimeout(function() {
      Auth.fetch({
        method: 'get',
        url: `http://localhost:3001/Customers/${props.currentUser.customer_id}/Coupons/${couponID}`,
        data: {},
      }).then(res => {
        if (res && res.coupon) {
          console.log(res.coupon);
        } else {
          console.log('Coupon Not Found');
        }
      });
      // }, 3000);
    }
    Auth.fetch({
      method: 'get',
      url: `http://localhost:3001/Batches/${props.match.params.batchID}`,
      data: {},
    }).then(res => {
      if (res && res.batch) {
        console.log(res.batch);
        setBatch(res.batch[0]);
      } else {
        console.log('Not Found');
      }
    });
  }, [props.match.params.batchID, props.currentUser.customer_id, isClaimed, couponID]);

  const handleClaim = () => {
    Auth.fetch({
      method: 'post',
      url: `http://localhost:3001/Business/${batch.business_id}/Batches/${
        props.match.params.batchID
      }/Coupons`,
      data: {},
    }).then(res => {
      if (res) {
        console.log(res);
        setIsClaimed(true);
        setCouponID(res.coupon_id);
      } else {
        console.log('Not Found');
      }
    });
  };

  return (
    <React.Fragment>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Grid container item>
          <Grid item xs={2} sm={2} md={1}>
            <Tooltip title="Back">
              <IconButton aria-label="back" onClick={() => props.history.goBack()}>
                <ArrowBack />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={10} sm={10} md={11}>
            <Paper>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    <CardGiftcard />
                    {` ${batch.description}`}
                  </Typography>
                </Grid>

                <Grid item xs={4} md={12} style={{ padding: '7px' }}>
                  {batch.business_type && (
                    <Chip
                      avatar={<Avatar>{batch.business_type.charAt(0)}</Avatar>}
                      label={batch.business_type}
                      color="primary"
                      clickable
                      size="small"
                    />
                  )}
                </Grid>
                <Grid item xs={8} md={12}>
                  {batch.expiry_date && <ExpireDate date={batch.expiry_date} />}
                </Grid>
              </Grid>
              <Divider variant="middle" />

              <Typography variant="subtitle1">
                <Place style={{ color: 'red' }} />
                {` ${batch.business_name}`}
              </Typography>
              <div style={{ marginTop: '10px' }}>
                <Button color="primary" onClick={handleClaim} disabled={isClaimed}>
                  Claim Coupon
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
