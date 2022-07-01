import React,{Component} from "react";
import {faCalendar, faRunning} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Card.css';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";
export default class Card extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="col-lg-3 col-md-4 col-sm-6">
            <div className="card" style={{width:"auto", marginLeft:"0px"}}>
                <div className="card-img-top text-center">
                    <img className="img-fluid" src={logo} alt="logo"/>
                </div>
                <div className="card-title text-center"><Link to={`/roadtrip/${this.props.actions}/${this.props.id}`}>{this.props.title}</Link></div>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <span><FontAwesomeIcon  icon={faCalendar} /> {this.props.dates.departure}</span>
                        <span><FontAwesomeIcon  icon={faCalendar} /> {this.props.dates.arrival}</span>
                    </div>
                    <div><span>{this.props.budget.min} € - {this.props.budget.max} €</span></div>
                    <div><span>tags: {this.props.citiesName}</span></div>
                </div>
            </div>

        </div>);
    }
}