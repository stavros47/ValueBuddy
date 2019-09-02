import React from 'react';
import Select from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid, Switch } from '@material-ui/core';

export default function SortFilterBatches(props) {
  return (
    <Grid container item spacing={1}>
      <Grid item xs={5}>
        <FormControlLabel
          size="small"
          labelPlacement="top"
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
      <Grid item xs={7}>
        Sort
        <Select
          value={props.selectedSort}
          onChange={props.handleSortChange}
          options={props.sortOptions}></Select>
      </Grid>
      <Grid item xs={12}>
        Filter
        <Select
          isMulti
          value={props.selectedFilter}
          onChange={props.handleFilterChange}
          options={props.filterOptions}></Select>
      </Grid>
    </Grid>
  );
}
