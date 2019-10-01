import React from 'react';
import { TextField } from '@material-ui/core';

export default function ContactDetails(props) {
  return (
    <div>
      <TextField
        autoFocus
        value={props.phone}
        onChange={props.handleInputChange}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="phone"
        type="text"
        label="Phone Number"
        name="phone"
      />
      <TextField
        value={props.address1}
        onChange={props.handleInputChange}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="address1"
        type="text"
        label="Adress Line 1"
        name="address1"
      />
      <TextField
        value={props.address2}
        onChange={props.handleInputChange}
        variant="outlined"
        margin="normal"
        fullWidth
        id="address2"
        type="text"
        label="Adress Line 2"
        name="address2"
      />
      <TextField
        value={props.city}
        onChange={props.handleInputChange}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="city"
        type="text"
        label="City"
        name="city"
      />
      <TextField
        value={props.country}
        onChange={props.handleInputChange}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="country"
        type="text"
        label="Country"
        name="country"
      />
    </div>
  );
}
