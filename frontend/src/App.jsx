import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import UserRegistration from "./Components/UserRegistration";
import { PrivateRoute } from "./Components/PrivateRoute"; //Higher order component
import UserLogin from "./Components/UserLogin";

import AuthHelperMethods from "./Components/AuthHelperMethods";
const Auth = new AuthHelperMethods("http://localhost:3001");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: Auth.loggedIn() ? Auth.getTokenData() : null,
      isAuthed: Auth.loggedIn()
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(result) {
    if (result) {
      this.setState({ currentUser: Auth.getTokenData(), isAuthed: true });
    }
  }

  handleLogout(e) {
    e.preventDefault();

    Auth.logout();
    this.setState({
      currentUser: Auth.loggedIn() ? Auth.getTokenData() : null,
      isAuthed: false
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={Dashboard}
            user={this.state.currentUser}
            handleLogout={this.handleLogout}
            isAuthed={this.state.isAuthed}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <UserLogin {...props} handleLogin={this.handleLogin} />
            )}
          />
          <Route exact path="/signup" component={UserRegistration} />
          <PrivateRoute
            exact
            path="*"
            component={Dashboard}
            user={this.state.currentUser}
            handleLogout={this.handleLogout}
            isAuthed={this.state.isAuthed}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
