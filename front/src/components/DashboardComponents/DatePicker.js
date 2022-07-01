import React, { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/DatePicker.css';

export default class DatePiker extends Component{
    constructor(props) {
        super(props);
        this.departure = React.createRef();
        this.arrival = React.createRef();
        this.dates = this.dates.bind(this);
    }

    dates(){

        this.props.date_picker(this.arrival.current.value,this.departure.current.value);
    }

    render() {
        return (
            <div className="col-md-6 mt-2">
                <div className="form-row align-items-center">
                    <div className="col">
                        <input ref={this.departure} className="form-control dash-datepicker" type="date" defaultValue={this.props.dates.departure}/>
                    </div>
                        to
                    <div className="col">
                        <input ref={this.arrival}  onChange={this.dates} className="form-control dash-datepicker" defaultValue={this.props.dates.arrival} type="date"/>
                    </div>

                </div>
            </div>
        );
    }
}