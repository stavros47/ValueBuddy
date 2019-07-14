import React, { Component } from 'react'
import axios from 'axios';

function UserLogin() {
    return (         
        <div className="login-box d-flex flex-row justify-content-center">
            <form>
                <h3>Welcome</h3>
                <div className="form-row">
                    <div className="form-group">                        
                        <input type="text" className="form-control" id="inputUsername" placeholder="Username"/>
                    </div>
                </div> 
                <div className="form-row">
                    <div className="form-group">                        
                        <input type="text" className="form-control" id="inputPassword" placeholder="Password"/>                            
                    </div>
                    
                </div>
                <div className="form-btns d-flex justify-content-between">
                <button type="submit" className="btn btn-danger">Sign up</button>
                <button type="submit" className="btn btn-primary">Sign in</button>   
                </div>                                    
            </form>
        </div>
    );

}

export default UserLogin
