import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import Place from '@material-ui/icons/Place';
/* 
  A Date handling library that helps with date formating/parsing
  - using date_fns parseIso function I can get back a Date object from an iso date string
  - using date_fns format function I can format the date object to any desired format
  ex: format(parseISO(newBatch.start_date), "do-MMM-yyyy")
*/
import { parseISO, formatDistanceToNow, isAfter } from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    maxWidth: 800,
    marginTop: '3%',
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    margin: 'auto',
    textAlign: 'center',
    lineHeight: '90px',
    float: 'left',
    [theme.breakpoints.down('sm')]: {
      width: 64,
      height: 64,
      lineHeight: '60px',
    },
  },
  img: {
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'normal',
    fontSize: '2.6em',
    fontWeight: '700',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4em',
      overflow: 'auto',
    },
  },
  descr: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
  business: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
    },
  },
  expiry: {
    textAlign: 'right',
    float: 'right',
  },
  count: {
    float: 'right',
    marginTop: '10px',
  },
  count_sm: {},
}));

const availableCoupons = (created, claimed) => {
  return created - claimed;
};

/*The actual Batch Item*/
export default function BatchInstance(props) {
  const classes = useStyles();

  const {
    description,
    discount,
    discount_type,
    business_type,
    business_name,
    start_date,
    expiry_date,
    created_count,
    claimed_count,
    redeemed_count,
    status,
    isBusiness,
  } = props;
  //Temporarily remove warnings for unused variables
  if (business_type && start_date && redeemed_count && status) {
    console.log('BatchInstance');
  }

  return (
    <Grid item>
      <Paper className={classes.paper} elevation={4}>
        <Grid container item spacing={1} justify="space-around">
          <Grid item xs={3}>
            <Paper className={classes.image}>
              <span className={classes.img}>{`${discount_type === 'Flat' ? '$' : ''}${discount}${
                discount_type === 'Percentage' ? '%' : ''
              }`}</span>
            </Paper>
          </Grid>
          <Grid xs={5} md={7} item container>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.descr}>
                {description}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.business}>
                <Place style={{ color: 'red' }} />
                {` ${business_name}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={4} md={2} item container>
            <Grid item>
              <Typography variant="caption" color="textSecondary" className={classes.expiry}>
                {`${
                  isAfter(parseISO(expiry_date), new Date()) ? 'Expires' : 'Expired'
                } ${formatDistanceToNow(parseISO(expiry_date), {
                  addSuffix: true,
                })}`}
              </Typography>
              {isBusiness && (
                <Typography variant="caption" className={classes.count}>
                  {`${availableCoupons(created_count, claimed_count)} / ${created_count}`}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
