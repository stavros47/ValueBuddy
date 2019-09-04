import React from 'react';
import Select from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid, Switch } from '@material-ui/core';

export default function SortFilter(props) {
  return (
    <Grid container item spacing={0}>
      <Grid item xs={6}>
        Sort By:
        <Select
          value={props.selectedSort}
          onChange={props.handleSortChange}
          options={props.sortOptions}></Select>
      </Grid>
      <Grid item xs={6}>
        Direction:
        <Select
          value={props.selectedAsc}
          onChange={props.handleDirectionChange}
          options={props.directionOptions}></Select>
      </Grid>
      <Grid item xs={5}>
        <FormControlLabel
          size="small"
          labelPlacement="end"
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
    </Grid>
  );
}
