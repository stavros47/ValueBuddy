import React from 'react'
// import axios from 'axios';

import AuthHelperMethods from './AuthHelperMethods';
const Auth = new AuthHelperMethods("http://localhost:3001");

class UserLogin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            host:"localhost",
            port:"3001",
            email: '',
            password: '',
            isAuthed: props.isAuthed
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        if(Auth.loggedIn()){
            this.props.history.replace("/");
        }
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
       event.preventDefault();       
    
       Auth.login(this.state.email, this.state.password)
       .then(res => {
         if (res === false) {
           return alert("Sorry those credentials don't exist!");
         }
         this.props.handleLogin(res);
         this.props.history.replace("/");
       })
       .catch(err => {
         alert(err);
       });
             
    };

     render(){

        return (         
            <div className="login-box d-flex flex-row justify-content-center">
                <form onSubmit={this.handleSubmit}> 
                    <h3>Welcome</h3>
                    <div className="form-row">
                        <div className="form-group">                        
                            <input type="email" className="form-control" id="inputUsername" placeholder="Your email"
                            name="email" value={this.state.email} onChange={this.handleInputChange}/>
                        </div>
                    </div> 
                    <div className="form-row">
                        <div className="form-group">                        
                            <input type="text" className="form-control" id="inputPassword" placeholder="Your password"
                            name="password" value={this.state.password} onChange={this.handleInputChange}/>                            
                        </div>
                        
                    </div>
                    <div className="form-btns d-flex justify-content-between">
                    <button type="submit" className="btn btn-danger" onClick={
                        (e)=>{
                            this.props.history.push("/signup");
                            e.preventDefault();
                        }
                    }>Sign up</button>
                    <button type="submit" className="btn btn-primary">Sign in</button>   
                    </div>                                    
                </form>
            </div>
        );
    }

}

export default UserLogin;
