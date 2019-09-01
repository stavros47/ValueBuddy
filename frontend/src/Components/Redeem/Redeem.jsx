import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Typography, Container } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { makeStyles } from '@material-ui/core/styles';

import AuthHelperMethods from '../AuthHelperMethods';

const Auth = new AuthHelperMethods('http://localhost:3001');

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RedeemPage(props) {
  const classes = useStyles();

  const [couponData, setCouponData] = useState({ redeemCode: '', item: '' });
  const [hasError, setHasError] = useState(false);
  const { resourcePath } = props;

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setCouponData({
      ...couponData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    Auth.fetch({
      method: 'post',
      url: `http://localhost:3001/${resourcePath}/Coupons`,
      data: { redeem_code: couponData.redeemCode, redeemed_item: couponData.item },
      validateStatus: function(status) {
        return (status = 400);
      },
    })
      .then(res => {
        if (res) {
          console.log('resss', res);
          console.log(res.message);
          if (res.redeem_success === true) {
            setCouponData({ redeemCode: '', item: '' });
            setHasError(false);
          } else {
            setHasError(true);
          }
          if (document.getElementById('redeem_code')) {
            document.getElementById('redeem_code').focus();
          }
        }
      })
      .catch(e => console.log(e));
  }
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ShoppingBasketIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Redeem Coupon
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={couponData.redeemCode}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={hasError}
              id="redeem_code"
              type="text"
              label="Coupon Redeem Code"
              name="redeemCode"
              autoComplete="code"
              autoFocus
            />
            <TextField
              value={couponData.item}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              fullWidth
              id="redeemed_item"
              type="text"
              label="Item"
              name="item"
              autoComplete="item"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}>
              Redeem
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
