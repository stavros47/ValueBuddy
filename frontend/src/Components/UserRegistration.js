import React, { Component } from 'react';

export class UserRegistration extends Component {
    constructor(props){
        super(props);

        this.state = { 
            username:'',
            password:'',
            confirm_password:'',
            customer: {           
                first_name:'',
                last_name:'',
                email:'',
                phone:'',
                dob:'',
                address:'',
                city:'',
                country:''  }
       }
    }

    render() {
        return (
            <div className="container register-box">
                <div className="row">
                    <div className="welcome bg-primary col-md-4">
                        <h3 style={{color:'white', fontWeight:'bold'}}>Welcome</h3>
                        <br/>
                        <p>You are 30 seconds away from saving money</p>
                        <p>Are you a business looking to reward your trusted customers?</p>
                        <p>Sign up now!</p>
                        <div className="login-box2">
                            <p>Already Registered?</p>
                            <button type="submit" className="btn btn-danger" onClick={
                        (e)=>{
                            this.props.history.push("/");
                            e.preventDefault();
                        }
                    }>Sign in</button>
                        </div>
                    </div>                
                    <div className="register col-md-8">
                        <form className="customerForm">
                            <h3>Register as a Customer</h3>
                            <br/>
                            <div className="form-row">
                                <div className="form-group col-md-6">                        
                                    <input type="text" className="form-control" id="inputUsername" placeholder="Username" autoFocus/>
                                </div>
                                <div className="form-group col-md-6">                        
                                    <input type="text" className="form-control" id="inputEmail" placeholder="Your Email"/>
                                </div>
                            </div> 

                            <div className="form-row">
                                <div className="form-group col-md-6">                        
                                    <input type="text" className="form-control" id="inputPassword" placeholder="Password"/>                            
                                </div> 
                                <div className="form-group col-md-6">                        
                                    <input type="text" className="form-control" id="inputConfirmPassword" placeholder="Confirm Password"/>                            
                                </div>                              
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">                        
                                    <input type="text" className="form-control" id="inputFirstName" placeholder="First Name"/>
                                </div>
                                <div className="form-group col-md-6">                        
                                    <input type="text" className="form-control" id="inputLastName" placeholder="Last Name"/>
                                </div>
                            </div> 

                            <div className="form-row">
                                <div className="form-group col-md-6">                        
                                    <input type="text" className="form-control" id="inputPhone" placeholder="Your Phone"/>
                                </div>
                                <div className="form-group col-md-6">                        
                                    <input type="text" className="form-control" id="inputAddress" placeholder="Your Address"/>
                                </div>
                            </div> 

                            <div className="form-row">
                                <div className="form-group col-md-6">                        
                                    <input type="text" className="form-control" id="inputCity" placeholder="City"/>
                                </div>
                                <div className="form-group col-md-6">                        
                                    <input type="text" className="form-control" id="inputCountry" placeholder="Country"/>
                                </div>
                            </div> 
                            <div className="form-row">
                                <div className="form-group col-md-6">    
                                    <label htmlFor="inputDOB">Date of Birth:</label>                    
                                    <input type="date" className="form-control" id="inputDOB" placeholder="Date"/>
                                </div>                           
                            </div> 
                        
                            <div className="form-btns d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary">Sign up</button>
                            </div>                                    
                        </form>
                    </div>
                    </div> 
        </div>
        )
    }
}

export default UserRegistration;
