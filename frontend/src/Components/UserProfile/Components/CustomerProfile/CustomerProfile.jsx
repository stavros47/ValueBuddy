import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Avatar, Typography, Divider } from '@material-ui/core';
import { Email, Phone } from '@material-ui/icons';
import { parseISO, format } from 'date-fns';

const useStyles = makeStyles(theme => ({
  root: {},
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

const CustomerProfile = props => {
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
            {currentUser.first_name && (
              <Typography gutterBottom variant="h6">
                {`${currentUser.first_name} ${currentUser.last_name}`}
              </Typography>
            )}

            <Typography variant="caption">Born:</Typography>
            {currentUser.dateofbirth && (
              <Typography className={classes.dateText} color="textSecondary" variant="body1">
                {format(parseISO(currentUser.dateofbirth), 'dd MMM yyyy')}
              </Typography>
            )}
          </div>
          <Avatar className={classes.avatar} src={user.avatar} />
        </div>
        <div className={classes.progress}>
          {' '}
          <Typography variant="body2">Bio:</Typography>
          <Typography color="textSecondary" variant="caption">
            Enthusiastic individual looking to save $$$ on crazy good deals! Show me the money..
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

export default CustomerProfile;
