import React, { Component } from "react";
import axios from "axios";
import '../style/RegisterPage.css';
import logo from "../assets/logo.png"
import background from "../assets/register-background.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import {
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      pseudo: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmedPassword: "",
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

    const {pseudo, email, firstname, lastname, password} = this.state;
    axios.post('http://localhost:8000/user/signup', {
      pseudo: pseudo, 
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password
    }).then( ( response ) => {
      if (response.statusText === "OK") {
        localStorage.setItem('UserId', response.data.user_id);
        localStorage.setItem('UserToken', response.data.token);
        this.DashboardRedirection();
      }
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
          <div className="register-container">
            <Container>
              <Row>
                <Col lg="6" sm="12" xs="12" xl="6">
                  <form onSubmit={this.handleSubmit} className="register-form">
                    <p>
                      <img src={logo} alt="Logo" />
                    </p>
                    <p>
                      <input
                        type="email"
                        name="email"
                        className="register-form-input"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      />
                    </p>
                    <p>
                      <input
                        type="name"
                        name="lastname"
                        className="register-form-input"
                        placeholder="Lastname"
                        value={this.state.lastname}
                        onChange={this.handleChange}
                        required
                      />
                    </p>
                    <p>
                      <input
                        type="name"
                        name="firstname"
                        className="register-form-input"
                        placeholder="Firstname"
                        value={this.state.firstname}
                        onChange={this.handleChange}
                        required
                      />
                    </p>
                    <p>
                      <input
                        type="name"
                        name="pseudo"
                        className="register-form-input"
                        placeholder="Pseudo"
                        value={this.state.pseudo}
                        onChange={this.handleChange}
                        required
                      />
                    </p>
                    <div className="register-form-footer">
                      <p>
                        <input
                          type="password"
                          name="password"
                          className="register-form-input"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          required
                        />
                      </p>
                      <p>
                      <input
                          type="password"
                          name="confirmedPassword"
                          className="register-form-input"
                          placeholder="Password"
                          value={this.state.confirmedPassword}
                          onChange={this.handleChange}
                          required
                        />
                      </p>
                    </div>
                    <p>
                      <button 
                          className="register-form-button"
                          type="submit">
                              Sign Up
                      </button>
                    </p>
                    <p className="register-form-text">
                      <a className="register-form-link" href="/login">Back to Login</a>
                    </p>
                  </form>
                </Col>
                <Col lg="6" sm="12" xs="12" xl="6">
                  <div className="register-form-picture">
                    <img src={background} alt="background" />
                  </div>
                </Col>

              </Row>
            </Container>
          </div>
      </Router>
    );
  }
}