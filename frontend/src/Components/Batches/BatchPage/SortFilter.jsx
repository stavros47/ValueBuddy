import React from 'react';
import Select from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid, Switch } from '@material-ui/core';

export default function SortFilter(props) {
  return (
    <Grid container item spacing={3}>
      <Grid item xs={6}>
        <FormControlLabel
          size="small"
          labelPlacement="start"
          control={
            <Switch
              checked={props.filterRedeemed}
              onChange={props.handleSwitch('toggle')}
              value="IsRedeemed"
              color="primary"
            />
          }
          label="Redeemed"
          style={{ fontSize: '0.5em' }}
        />
      </Grid>
      <Grid item xs={6}>
        <Select
          value={props.selectedOption}
          onChange={props.handleSortChange}
          options={props.options}></Select>
      </Grid>
    </Grid>
  );
}
