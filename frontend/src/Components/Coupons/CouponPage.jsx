import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import { CardGiftcard, Place, ArrowBack, FileCopy } from '@material-ui/icons';

import ExpireDate from '../Batches/BatchPage/ExpireDate';
import AuthHelperMethods from '../AuthHelperMethods';

const Auth = new AuthHelperMethods('http://localhost:3001');

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CouponPage(props) {
  const [coupon, setCoupon] = useState({});

  const [openDialog, setOpenDialog] = React.useState(false);

  function handleClickOpen() {
    setOpenDialog(true);
  }

  function handleClose() {
    setOpenDialog(false);
  }
  const { match, currentUser, resourcePath, isExpired } = props;

  const handleClickCopy = () => {
    if (coupon.redeem_code) {
      navigator.clipboard.writeText(coupon.redeem_code);
    }
  };

  //Get the initial coupon information.
  useEffect(() => {
    Auth.fetch({
      method: 'get',
      url: `http://localhost:3001/${resourcePath}/Coupons/${match.params.couponID}`,
      data: {},
    }).then(res => {
      console.log(res);
      if (res && res.coupon) {
        // console.log(res.coupon);
        setCoupon(res.coupon);
      } else {
        console.log('Not Found');
      }
    });
  }, [match.params.couponID, resourcePath]);

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
            <Typography variant="h5">Coupon Details</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Paper>
            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  <CardGiftcard />
                  {` ${coupon.description}`}
                </Typography>
              </Grid>

              <Grid item xs={4} md={12} style={{ padding: '7px' }}>
                {coupon.coupon_type && (
                  <RouterLink to={`/Discover/${coupon.coupon_type}`}>
                    <Chip
                      avatar={<Avatar>{coupon.coupon_type.charAt(0)}</Avatar>}
                      label={coupon.coupon_type}
                      color="primary"
                      clickable
                      size="small"
                    />
                  </RouterLink>
                )}
              </Grid>
              <Grid item xs={8} md={12}>
                {coupon.expiry_date && <ExpireDate date={coupon.expiry_date} />}
              </Grid>
              <Divider variant="middle" />
              <Grid container item xs={12} direction="column" alignItems="center" justify="center">
                <Grid item xs={12}>
                  {currentUser.role === 'customer' && !isExpired && (
                    <div style={{ marginTop: '10px' }}>
                      <Button color="primary" onClick={handleClickOpen}>
                        Redeem CODE
                      </Button>
                    </div>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" align="left">
                  <Place style={{ color: 'red' }} />
                  {` ${coupon.business_name}`}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">{`Show this at ${coupon.business_name} to Redeem your coupon!`}</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="caption" align="center">
                {coupon.redeem_code}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Tooltip title="Copy to Clipboard" aria-label="copy">
                <IconButton aria-label="copyClipboard" onClick={handleClickCopy}>
                  <FileCopy />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
