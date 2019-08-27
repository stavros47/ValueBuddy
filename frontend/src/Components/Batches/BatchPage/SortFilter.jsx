import React, { useState } from 'react';
import Select from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid, Switch } from '@material-ui/core';

export default function SortFilter(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [filterRedeemed, setFilterRedeemed] = useState(false);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const handleSortChange = selectedOption => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  const handleSwitch = name => event => {
    //console.log(event);
    setFilterRedeemed(event.target.checked);
  };

  return (
    <Grid container item spacing={3}>
      <Grid item xs={6}>
        <FormControlLabel
          size="small"
          labelPlacement="start"
          control={
            <Switch
              checked={filterRedeemed}
              onChange={handleSwitch('toggle')}
              value="IsRedeemed"
              color="primary"
            />
          }
          label="Redeemed"
        />
      </Grid>
      <Grid item xs={6}>
        <Select value={selectedOption} onChange={handleSortChange} options={options}></Select>
      </Grid>
    </Grid>
  );
}
