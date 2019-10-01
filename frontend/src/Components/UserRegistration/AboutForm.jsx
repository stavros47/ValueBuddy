import React from 'react';
import { Grid, TextField, MenuItem } from '@material-ui/core';

export default function AboutForm(props) {
  const { newUser, accountType, handleInputChange } = props;

  return (
    <div>
      {accountType === 'business' && (
        <>
          <TextField
            value={newUser.about}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="about"
            type="about"
            label="About"
            name="about"
            autoFocus
          />
          <TextField
            value={newUser.websiteURL}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="websiteURL"
            type="text"
            label="Website URL"
            name="websiteURL"
          />{' '}
        </>
      )}
      {accountType === 'customer' && (
        <>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                select
                required
                margin="dense"
                name="gender"
                value={newUser.gender}
                onChange={handleInputChange}
                id="gender"
                label="Gender">
                <MenuItem selected value="male">
                  Male
                </MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="dob"
                value={newUser.dob}
                onChange={handleInputChange}
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
