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
import { parseISO, format } from 'date-fns';

import SortFilter from './SortFilter';
import ExpireDate from './ExpireDate';
import AuthHelperMethods from '../../AuthHelperMethods';

const Auth = new AuthHelperMethods('http://localhost:3001');

export default function BatchPage(props) {
  const { match, currentUser, resourcePath } = props;

  const [batch, setBatch] = useState({});
  const [batchCoupons, setBatchCoupons] = useState([]);
  const [isClaimed, setIsClaimed] = useState(props.isClaimed || false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const [selectedSort, setSelectedSort] = useState({
    label: 'Customer Name',
    value: 'customer_name',
  });
  const [filterRedeemed, setFilterRedeemed] = useState(false);
  const [selectedAsc, setSelectedAsc] = useState({ label: 'Desc', value: false });

  const sortOptions = [
    { label: 'Customer Name', value: 'customer_name' },
    { label: 'Date Claimed', value: 'date_claimed' },
    { label: 'Date Used', value: 'date_used' },
  ];
  const directionOptions = [{ label: 'Asc', value: true }, { label: 'Desc', value: false }];

  const handleSortChange = selectedOption => {
    setSelectedSort(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  const handleDirectionChange = selectedOption => {
    setSelectedAsc(selectedOption);
    //console.log(`dir selected:`, selectedOption.value);
  };

  const handleSwitch = name => event => {
    setFilterRedeemed(event.target.checked);
  };

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  }

  //Get the initial batch information.
  useEffect(() => {
    if (currentUser.role === 'customer') {
      Auth.fetch({
        method: 'get',
        url: `http://localhost:3001/Batches/${match.params.batchID}`,
        data: {},
      })
        .then(res => {
          if (res && res.batch) {
            console.log('res', res);
            setBatch(res.batch);
          } else {
            console.log('Not Found');
          }
        })
        .catch(e => console.log(e));
    } else if (currentUser.role === 'business') {
      let orderBy = selectedSort ? selectedSort.value : 'customer_name';
      let isAsc = selectedAsc ? selectedAsc.value : true;
      Auth.fetch({
        method: 'get',
        url: `http://localhost:3001/${resourcePath}/Batches/${match.params.batchID}?orderBy='${orderBy}'&isAsc=${isAsc}`,
        data: {},
      })
        .then(res => {
          if (res && res.batch) {
            console.log('res', res);
            setBatch(res.batch);
            setBatchCoupons(res.coupons);
          } else {
            console.log('Not Found');
          }
        })
        .catch(e => console.log(e));
    }
  }, [match.params.batchID, currentUser.role, resourcePath, selectedSort, selectedAsc]);

  const handleClaim = () => {
    Auth.fetch({
      method: 'post',
      url: `http://localhost:3001/Business/${batch.business_id}/Batches/${props.match.params.batchID}/Coupons`,
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
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
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
              <Grid container direction="row" justify="flex-start" alignItems="flex-start">
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
                <Grid item xs={12}>
                  {' '}
                  {currentUser.role === 'customer' && (
                    <div style={{ marginTop: '10px' }}>
                      <Button color="primary" onClick={handleClaim} disabled={isClaimed}>
                        Claim Coupon
                      </Button>
                    </div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" align="left">
                    <Place style={{ color: 'red' }} />
                    {` ${batch.business_name}`}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" />
        {currentUser.role === 'business' ? (
          <>
            <Grid item xs={12} md={4}>
              <SortFilter
                selectedSort={selectedSort}
                sortOptions={sortOptions}
                handleSortChange={handleSortChange}
                selectedAsc={selectedAsc}
                directionOptions={directionOptions}
                handleDirectionChange={handleDirectionChange}
                filterRedeemed={filterRedeemed}
                handleSwitch={handleSwitch}
              />
            </Grid>

            <Grid container item xs={12} md={11} spacing={1} style={{ marginTop: '10px' }}>
              {batchCoupons.map(coupon => {
                if (filterRedeemed === coupon.is_redeemed) {
                  return (
                    <Grid item xs={12} key={coupon.coupon_id}>
                      <Paper
                        style={{
                          border: '1px solid',
                          borderColor: coupon.is_redeemed ? 'green' : 'orange',
                          marginTop: '4px',
                          padding: '8px',
                        }}>
                        <Grid container direction="row">
                          <Grid item xs={7}>
                            <Typography variant="body1">{coupon.customer_name}</Typography>
                          </Grid>
                          <Grid item xs={5}>
                            {coupon.date_claimed && (
                              <React.Fragment>
                                <Typography variant="overline">Claimed:</Typography>
                                <Typography variant="body2">
                                  {format(parseISO(coupon.date_claimed), 'EEE, MMM dd yyyy')}
                                </Typography>
                              </React.Fragment>
                            )}
                          </Grid>

                          <Grid container item xs={12}>
                            <Grid item xs={7}>
                              {coupon.date_used && (
                                <React.Fragment>
                                  <Typography variant="overline">Redeemed:</Typography>
                                  <Typography variant="body2">
                                    {format(parseISO(coupon.date_used), 'EEE, MMM dd yyyy')}
                                  </Typography>
                                </React.Fragment>
                              )}
                            </Grid>
                            <Grid item xs={5}>
                              {coupon.purchased_item && (
                                <React.Fragment>
                                  <Typography variant="overline">Discounted Item:</Typography>
                                  <Typography variant="subtitle2">
                                    {coupon.purchased_item}
                                  </Typography>
                                </React.Fragment>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  );
                }
                return null;
              })}
            </Grid>
          </>
        ) : null}
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
