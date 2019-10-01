import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  TextField,
  MenuItem,
  CssBaseline,
  Typography,
  Container,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Link,
} from '@material-ui/core';

import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import BasicAppBar from '../BasicAppBar';
import AuthHelperMethods from '../AuthHelperMethods';
import { makeStyles } from '@material-ui/core/styles';
import GeneralForm from './GeneralForm';
import ContactDetails from './ContactDetails';
import AboutForm from './AboutForm';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  rootS: {
    width: '90%',
  },
  buttonS: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainerS: {
    marginBottom: theme.spacing(2),
  },
  resetContainerS: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Choose Account Type', 'Account Details', 'Your Contact Details', 'Additional info'];
}

const Auth = new AuthHelperMethods('http://localhost:3001');

export default function UserRegistration(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [accountType, setAccountType] = useState('customer');
  const [newUser, SetNewUser] = useState({
    email: '',
    password: '',
    business_name: '',
    business_type: '',
    first_name: '',
    last_name: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    about: '',
    dob: '',
    gender: 'male',
    phone: '',
    websiteURL: '',
  });

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    SetNewUser({
      ...newUser,
      [name]: value,
    });
  }

  function handleAccountTypeChange(event) {
    setAccountType(event.target.value);
  }

  const steps = getSteps();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              select
              required
              margin="dense"
              name="type"
              value={accountType}
              onChange={handleAccountTypeChange}
              id="account_type"
              label="Create as">
              <MenuItem selected value="customer">
                Customer
              </MenuItem>
              <MenuItem value="business">Business</MenuItem>
            </TextField>
          </div>
        );
      case 1:
        return (
          <GeneralForm
            accountType={accountType}
            handleTypeChange={handleAccountTypeChange}
            newUser={newUser}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <ContactDetails
            accountType={accountType}
            handleTypeChange={handleAccountTypeChange}
            newUser={newUser}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <AboutForm
            accountType={accountType}
            handleTypeChange={handleAccountTypeChange}
            newUser={newUser}
            handleInputChange={handleInputChange}
          />
        );
      default:
        return <div>{'Error: Unknown step'}</div>;
    }
  }

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  useEffect(() => {
    if (Auth.loggedIn()) {
      props.history.replace('/');
    }
  });

  function handleSubmit(event) {
    event.preventDefault();
    handleNext();

    const requestResource = accountType === 'business' ? 'Business' : 'Customers';
    Auth.fetch({
      method: 'post',
      url: `http://localhost:3001/${requestResource}`,
      data: { ...newUser },
      validateStatus: function(status) {
        return (status = 404);
      },
    }).then(res => {
      console.log(res);
    });
  }

  return (
    <div>
      <BasicAppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SupervisorAccount />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome, Sign up
          </Typography>
          <Link
            href="#"
            variant="body2"
            onClick={e => {
              props.history.push('/login');
              e.preventDefault();
            }}>
            {'Existing User? Sign in'}
          </Link>
        </div>
      </Container>
      <div className={classes.paper}>
        <div className={classes.rootS}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {getStepContent(index)}
                  <div className={classes.actionsContainerS}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.buttonS}>
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.buttonS}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainerS}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} className={classes.buttonS}>
                Reset
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.buttonS}>
                Create Account
              </Button>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
}
