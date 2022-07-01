import React, { Component } from "react";
import axios from "axios";
import '../style/LoginPage.css';
import logo from "../assets/logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
      toDashboard: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {

    const {email, password} = this.state;
    axios.post('http://localhost:8000/user/login', {
      email: email,
      password: password
    }).then( ( response ) => {
		//console.log(response);
      if (response.statusText === "OK")
        localStorage.setItem('UserId', response.data.user_id);
        localStorage.setItem('UserToken', response.data.token);
        this.DashboardRedirection();
      })
    
    .catch(function(error){
    }).finally(function(){})
    event.preventDefault();

  }

  DashboardRedirection(response){
    this.setState({toDashboard: true});
    return <Redirect to='/dashboard'/>;
  }

  render() {

    if (this.state.toDashboard === true)
      return <Redirect to='/dashboard'/>;

    return (
      <Router>
          <div className="login-container">
            <form onSubmit={this.handleSubmit} className="login-form">
              <p>
                <img src={logo} alt="Logo" />
              </p>
              <p>
                <input
                  type="email"
                  name="email"
                  className="login-form-input"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </p>
              <p>
                <input
                  type="password"
                  name="password"
                  className="login-form-input"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </p>
              <p>
                <button 
                    className="login-form-button"
                    type="submit">
                        Sign In
                </button>
              </p>
              <p className="login-form-text">
                Don't have an account ?
                <a className="login-form-link" href="/register">Subscrire</a>
              </p>
            </form>
          </div>
      </Router>
    );
  }
}