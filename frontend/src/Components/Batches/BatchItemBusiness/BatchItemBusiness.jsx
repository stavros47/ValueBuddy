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

export default function BatchItemBusiness(props) {
  const [batch, setBatch] = useState({});
  const { match, currentUser } = props;

  //Get the initial batch information.
  useEffect(() => {
    Auth.fetch({
      method: 'get',
      url: `http://localhost:3001/Batches/${match.params.batchID}`,
      data: {},
    }).then(res => {
      if (res && res.batch) {
        console.log(res.batch);
        setBatch(res.batch[0]);
      } else {
        console.log('Not Found');
      }
    });
  }, [match.params.batchID]);

  return (
    <React.Fragment>
      <Grid container direction="row" justify="flex-start" alignItems="flex-start">
        <Grid item xs={2} sm={2} md={1}>
          <Tooltip title="Back">
            <IconButton aria-label="back" onClick={() => props.history.goBack()}>
              <ArrowBack />
            </IconButton>
          </Tooltip>
        </Grid>

        <Grid item xs={10} sm={10} md={11}>
          <Paper />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
