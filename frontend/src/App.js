import React from 'react';
import {Route} from 'react-router-dom';
import NavBar from './Components/NavBar';
import UserLogin from './Components/UserLogin/UserLogin';
import UserRegistration from './Components/UserRegistration';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Route exact path='/' component={UserLogin}/>
      <Route exact path='/signup' component={UserRegistration}/>
    </div>
  );
}

export default App;
