import React from 'react';
import Select from 'react-select';
import { Grid } from '@material-ui/core';

export default function SortFilterBatches(props) {
  return (
    <Grid container item spacing={1}>
      <Grid item xs={7}>
        Sort by:
        <Select
          value={props.selectedSort}
          onChange={props.handleSortChange}
          options={props.sortOptions}></Select>
      </Grid>
      <Grid item xs={5}>
        Direction:
        <Select
          value={props.sortDirection}
          onChange={props.handleSortDirChange}
          options={props.dirOptions}></Select>
      </Grid>

      <Grid item xs={7}>
        Status:
        <Select
          value={props.selectedStatus}
          onChange={props.handleStatusChange}
          options={props.statusOptions}></Select>
      </Grid>
      <Grid item xs={5}>
        Type:
        <Select
          value={props.selectedType}
          onChange={props.handleTypeChange}
          options={props.typeOptions}></Select>
      </Grid>
    </Grid>
  );
}
