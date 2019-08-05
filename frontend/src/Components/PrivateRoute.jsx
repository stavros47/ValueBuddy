import React from "react";
import { Route, Redirect } from "react-router-dom";

import AuthHelperMethods from "./AuthHelperMethods";
const Auth = new AuthHelperMethods("http://localhost:3001");

// export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!Auth.loggedIn()) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }

      // // check if route is restricted by role
      // if (roles && roles.indexOf(currentUser.role) === -1) {
      //     // role not authorised so redirect to home page
      //     return <Redirect to={{ pathname: '/'}} />
      // }

      // authorised so return component
      return <Component {...rest} {...props} />;
    }}
  />
);
