import React from 'react';
import {Link} from 'react-router-dom';
//import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';


function NavBar(props) {
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top navbar-expand-md">
      <Link className="navbar-brand" to="/">
        ValueBuddy
      </Link>     
       { props.user && <React.Fragment><button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
        
          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              User
            </button>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <button className="dropdown-item" >Profile</button>
              <button className="dropdown-item"  onClick={props.handleLogout}>SignOut</button>              
            </div>
          </li>
        </ul>
      </div> </React.Fragment>}
    </nav>
  );
}

export default NavBar;