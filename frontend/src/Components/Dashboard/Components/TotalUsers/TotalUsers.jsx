import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: 'green',
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  differenceIcon: {
    color: 'darkgreen',
  },
  differenceValue: {
    color: 'darkgreen',
    marginRight: theme.spacing(1),
  },
}));

export default function TotalUsers(props) {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)} raised>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
              TOTAL USERS
            </Typography>
            <Typography variant="h3">{props.total}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        {/* <div className={classes.difference}>
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            16%
          </Typography>
          <Typography className={classes.caption} variant="caption">
            Since last month
          </Typography>
        </div> */}
      </CardContent>
    </Card>
  );
}
