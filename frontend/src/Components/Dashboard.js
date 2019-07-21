import React from 'react';
import MenuAppBar from './MenuAppBar';

function Dashboard(props) {
    return (
        <div>
            <MenuAppBar user={props.user} handleLogout={props.handleLogout}/>
            DASHBOARD
        </div>
    );
  }
  
  export default Dashboard;