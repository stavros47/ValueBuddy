import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Avatar, Typography, Divider } from '@material-ui/core';
import { Email, Phone } from '@material-ui/icons';
import { parseISO, format } from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: { width: '300px' },
  details: {
    display: 'flex',
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  progress: {
    marginTop: theme.spacing(2),
  },
}));

const BusinessProfile = props => {
  const classes = useStyles();
  const { currentUser } = props;

  const user = {
    name: 'Shen Zhi',
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: '/images/avatars/avatar_01.png',
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.details}>
          <div>
            {currentUser.business_name && (
              <Typography variant="h6">{currentUser.business_name}</Typography>
            )}
            {currentUser.website && (
              <Typography gutterBottom variant="body2" color="textSecondary">
                {currentUser.website}
              </Typography>
            )}
            <Typography variant="caption">Category:</Typography>
            {currentUser.business_type && (
              <Typography variant="body2" color="textSecondary">
                {currentUser.business_type}
              </Typography>
            )}
            <Typography variant="caption">Created:</Typography>
            {currentUser.created && (
              <Typography className={classes.dateText} color="textSecondary" variant="body1">
                {format(parseISO(currentUser.created), 'dd MMM yyyy')}
              </Typography>
            )}
          </div>
          <Avatar className={classes.avatar} src={user.avatar} />
        </div>
        <div className={classes.progress}>
          {' '}
          <Typography variant="body2">Bio:</Typography>
          <Typography color="textSecondary" variant="caption">
            {currentUser.about}
          </Typography>
        </div>
      </CardContent>
      <Divider />
      <div className={classes.details}>
        <div style={{ padding: '15px' }}>
          {currentUser.address && (
            <>
              <Typography variant="body2">Address: </Typography>
              <Typography color="textSecondary" variant="body1">
                {currentUser.address}
              </Typography>
            </>
          )}
          <Divider variant="fullWidth" style={{ marginBottom: '10px' }} />
          <Grid container spacing={1}>
            {currentUser.email && (
              <>
                <Grid container item xs={12}>
                  <Grid item xs={2}>
                    <Email />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography color="textSecondary" variant="body1">
                      {currentUser.email}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
            {currentUser.phone && (
              <>
                <Grid container item xs={12}>
                  <Grid item xs={2}>
                    <Phone />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography color="textSecondary" variant="body1">
                      {currentUser.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </div>
    </Card>
  );
};

export default BusinessProfile;
