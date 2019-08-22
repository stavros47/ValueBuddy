import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
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
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { CardGiftcard, Place, ArrowBack, CheckCircle, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import ExpireDate from './ExpireDate';
import AuthHelperMethods from '../../AuthHelperMethods';

const Auth = new AuthHelperMethods('http://localhost:3001');
export default function CouponPage(props) {
  const [batch, setBatch] = useState({});
  const [isClaimed, setIsClaimed] = useState(props.isClaimed || false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  }

  //Get the initial batch information.
  useEffect(() => {
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
  }, [props.match.params.batchID, props.currentUser.customer_id]);

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
        setOpenSuccess(true);
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
                    <RouterLink to={`/Discover/${batch.business_type}`}>
                      <Chip
                        avatar={<Avatar>{batch.business_type.charAt(0)}</Avatar>}
                        label={batch.business_type}
                        color="primary"
                        clickable
                        size="small"
                      />
                    </RouterLink>
                  )}
                </Grid>
                <Grid item xs={8} md={12}>
                  {batch.expiry_date && <ExpireDate date={batch.expiry_date} />}
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
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSuccess}
        autoHideDuration={5000}
        onClose={handleClose}>
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="success"
          message="Coupon Claimed. Great Choice!"
        />
      </Snackbar>
    </React.Fragment>
  );
}

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = CheckCircle;

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <Close className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}