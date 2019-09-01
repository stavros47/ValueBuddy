import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthHelperMethods {
  // Initializing important variables
  constructor(domain) {
    //THIS LINE IS ONLY USED IN PRODUCTION MODE!
    this.domain = domain || 'http://localhost:3001'; // API server domain
  }
  login = (email, password) => {
    // Get a token from api server using the fetch api
    return this.fetch({
      method: 'post',
      url: 'http://localhost:3001/signin',
      data: {
        email,
        password,
      },
    }).then(res => {
      console.log('response:', res);
      this.setToken(res.token); // Setting the token in localStorage
      return Promise.resolve(res);
    });
  };

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  };

  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired.
        return true;
      } else return false;
    } catch (err) {
      console.log('expired check failed! Line 42: AuthService.js');
      return false;
    }
  };

  setToken = idToken => {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  };

  getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  };

  logout = () => {
    // Clear user token and profile data from localStorage
    console.log('Logout');
    localStorage.removeItem('id_token');
  };

  getTokenData = () => {
    // Using jwt-decode npm package to decode the token
    try {
      let tokenData = decode(this.getToken());
      console.log('Token decoded.');
      return tokenData;
    } catch (err) {
      console.log('Error line 69 AuthHelperMethods.js');
      return;
    }
  };

  fetch = options => {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken();
      headers['Access-Control-Allow-Origin'] = '*';
      headers['Access-Control-Allow-Credentials'] = 'true';
      headers['Access-Control-Allow-Methods'] = 'GET,HEAD,OPTIONS,POST,PUT';
      headers['Access-Control-Allow-Headers'] =
        'Origin, X-Requested-With, Content-Type, Accept, Authorization';
    }
    options.headers = headers;
    return (
      axios(options)
        // .then(this._checkStatus)
        .then(res => res.data)
        .catch(error => {
          console.log(error.message, `(${error.response.statusText})`);
          console.log('response:', error.response.data);
        })
    );
  };

  _checkStatus = response => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      // var error = new Error(response.statusText);
      // error.response = response;
      // throw error;
      console.log('Request status: ', response.statusText);
      return response;
    }
  };
}
