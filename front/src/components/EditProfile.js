import React, { Component } from "react";
import axios from "axios";
import '../style/EditProfile.css';
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
      userInfos: null,
      email: "",
      login: "",
      firstname: "",
      lastname: "",
      password: "",
      loginErrors: "",
      toProfile: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount() {
    const ApiUrl = 'http://localhost:8000/user/' + localStorage.getItem('UserId');
        //console.log(ApiUrl);
        axios.get(ApiUrl, { headers: {"Authorization" : localStorage.getItem('UserToken')} })
            .then(res => {
              this.setState({
                  userInfos: res.data,
                  email: res.data.email,
                  login: res.data.login,
                  firstname: res.data.firstname
              })
          }).catch(function (error) {
            // handle error
            console.log(error);
        });
  }

  handleSubmit(event) {

    console.log(localStorage.getItem('UserToken'));

    const {login, email, firstname, lastname, password} = this.state;
    axios.patch('http://localhost:8000/user/edit', {
      pseudo: login,
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      user_id: localStorage.getItem('UserId')
    }, { headers: {"Authorization" : localStorage.getItem('UserToken')} }).then( ( response ) => {
      if (response.statusText === "OK") {
        this.setState({
          toProfile: true
        });
      }
      })
    
    .catch(function(error){
    }).finally(function(){})
    event.preventDefault();

  }

  render() {

    if (this.state.toProfile === true)
      return <Redirect to='/profile'/>;

    if (this.state.userInfos != null) {
      return (
        <Router>
            <div className="">
              <Container>
                <Row>
                  <Col lg="12" sm="12" xs="12" xl="12">
                    <form onSubmit={this.handleSubmit} className="container-edition-form">
                        <h4 className="title-form">Update Informations</h4>
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
                          type="text"
                          name="login"
                          className="register-form-input"
                          placeholder="Login"
                          value={this.state.login}
                          onChange={this.handleChange}
                          required
                        />
                      </p>
                      <p>
                        <input
                          type="text"
                          name="firstname"
                          className="register-form-input"
                          placeholder="Firstname"
                          value={this.state.firstname}
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
                      </div>
                      <p>
                        <button 
                            className="register-form-button"
                            type="submit">
                                Save
                        </button>
                      </p>
                      <p className="register-form-text">
                        <a className="register-form-link" href="/profile">Discard changes</a>
                      </p>
                    </form>
                  </Col>
                </Row>
              </Container>
            </div>
        </Router>
      );
    }
    else
      return (
        <div className="profile-container">
            <p>Edit Profile Page</p>
        </div>
      )
  }
}