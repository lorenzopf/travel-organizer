import React, { Component } from "react";
import axios from "axios";
import '../style/ProfilePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { faUserAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import { Container, Row, Button } from 'reactstrap';
import { fromPairs } from "lodash";

export default class ManageUsers extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userInfos: null,
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   componentDidMount() {
        const ApiUrl = 'http://localhost:8000/user/' + localStorage.getItem('UserId');
        //console.log(ApiUrl);
        axios.get(ApiUrl, { headers: {"Authorization" : localStorage.getItem('UserToken')} })
            .then(res => {
                console.log(res.data);
            this.setState({
                userInfos: res.data
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        
        alert('Le nom a été soumis : ' + this.state.value);
        event.preventDefault();

        axios.put("http://localhost:8000/user/edit/", { headers: {"Authorization" : `${localStorage.getItem('UserToken')}`} }, {
            pseudo: this.state.userInfos.login,
            email: this.state.value,
            firstname: this.state.userInfos.firstname,
        }).then(res => {
            console.log(res.data);
            this.setState({
                userInfos: res.data
            })
        });
    }

    render() {

        if (this.state.userInfos != null) {
            return(
                <Container>
                    <Row style={{marginLeft: '5%'}}>
                        <div className="profile-icon-container">
                            <FontAwesomeIcon icon={faUserAlt} className="profile-icon"/>
                            <h4 className="icon-text">Hello <span style={{fontWeight: '700', color: '#43cdf7'}}>{this.state.userInfos.firstname}</span>,</h4>
                        </div>
                    </Row>
                    <Row>
                        <div className="card">
                            <div className="card-header">
                                User Informations
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Email : {this.state.userInfos.email}
                                </li>
                                <li className="list-group-item">Login : {this.state.userInfos.login}
                                </li>
                                <li className="list-group-item">firstname : {this.state.userInfos.firstname}
                                </li>
                            </ul>
                        </div>
                    </Row>
                    <Button href="/edit-profile" className="edit-button" outline color="primary">Edit User Informations</Button>
                </Container>
            );
        }
        else
            return (
                <div className="profile-container">
                    <p>Profile Page</p>
                </div>
            )
    }

}
