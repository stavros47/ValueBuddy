import React from 'react';
import { TextField } from '@material-ui/core';

export default function GeneralForm(props) {
  const { newUser, handleInputChange, accountType } = props;

  return (
    <div>
      {' '}
      <TextField
        value={newUser.email}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        type="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        value={newUser.password}
        onChange={handleInputChange}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      {props.accountType === 'business' && (
        <>
          <TextField
            value={newUser.business_name}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="businessName"
            type="text"
            label="Business Name"
            name="business_name"
          />
          <TextField
            value={newUser.business_type}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="businessType"
            type="text"
            label="Business Category"
            name="business_type"
          />
        </>
      )}
      {accountType === 'customer' && (
        <>
          <TextField
            value={newUser.fist_name}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="first_name"
            type="text"
            label="First Name"
            name="first_name"
          />
          <TextField
            value={newUser.last_name}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="last_name"
            type="text"
            label="Last Name"
            name="last_name"
          />
        </>
      )}
    </div>
  );
}
