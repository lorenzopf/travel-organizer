import React, { Component } from "react";
import logo from "../assets/logo.png"
import LoginPage from './LoginPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Menu.css';
import {
    BrowserRouter as Router,
    Redirect,
    Route
  } from "react-router-dom";
import { faTextHeight } from "@fortawesome/free-solid-svg-icons";
export default class Menu extends Component{

    constructor(props) {
        super(props);
        this.state = {
            log: false
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.setState({
            log: true
        })
        localStorage.setItem('UserId', "");
        localStorage.setItem('UserToken', "");
        window.location.href = "/login";
    }

    render() {

            if(localStorage.getItem('UserId').length > 0 ){
            return (
                <div className="container-fluid menu-container">
                    <div className="container">

                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="/dashboard"><img src={logo} alt="logo" className="img-fluid logo-menu"/></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav main-menu">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/explore">Explore <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/my-road-trips">My Road Trips</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/profile">profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/user-management">User management</a>
                                    </li>
                                    <li className="nav-item">
                                        <button className="menu-button" onClick={this.logout}>Logout</button>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
        );
    }else{
                return "";
            }
    }
}