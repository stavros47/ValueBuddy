import React from 'react';
/* 
  A Date handling library that helps with date formating/parsing
  - using date_fns parseIso function I can get back a Date object from an iso date string
  - using date_fns format function I can format the date object to any desired format
  ex: format(parseISO(newBatch.start_date), "do-MMM-yyyy")
*/
import { parseISO, formatDistanceToNow, isAfter, format } from 'date-fns';
import { Grid, Typography } from '@material-ui/core';
import DateRange from '@material-ui/icons/DateRange';

export default function ExpireDate(props) {
  const date = parseISO(props.date);
  return (
    <Grid container item direction="row" spacing={1} style={{ padding: '7px' }}>
      <Grid item xs={2} md={1} lg={1}>
        <DateRange style={{ fontSize: '28px' }} />
      </Grid>
      <Grid container item xs={10} md={11} lg={11}>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textPrimary">
            {date &&
              `${isAfter(date, new Date()) ? 'Expires' : 'Expired'} ${formatDistanceToNow(date, {
                addSuffix: true,
              })}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography align="left" variant="body1" color="textSecondary">
            {date && ` ${format(date, 'EEE, MMM dd yyyy')}`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
