import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import BasicAppBar from './BasicAppBar';
import AuthHelperMethods from './AuthHelperMethods';
import { makeStyles } from '@material-ui/core/styles';

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
}));

const Auth = new AuthHelperMethods('http://localhost:3001');

function Login(props) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const classes = useStyles();

  useEffect(() => {
    if (Auth.loggedIn()) {
      props.history.replace('/');
    }
  });

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    Auth.login(credentials.email, credentials.password)
      .then(res => {
        if (res === false) {
          return alert("Sorry those credentials don't exist!");
        }
        props.handleLogin(res);
        props.history.replace('/');
      })
      .catch(err => {
        alert(err);
      });
  }
  return (
    <div>
      <BasicAppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome, Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={credentials.email}
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
              value={credentials.password}
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={e => {
                    props.history.push('/signup');
                    e.preventDefault();
                  }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
