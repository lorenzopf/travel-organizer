import React, {Component} from "react";
import axios from "axios";


export default class Edit extends Component{
    constructor(props) {
        super(props);
   this.edit = this.edit.bind(this);
    }

    edit(){

        let data ={
            title: this.props.title,
            budget: this.props.budget,
            cities:this.props.cities,
            citiesName: this.props.citiesName,
            places: this.props.places,
            dates: this.props.dates,
            road_trip_id:this.props.roadtripId

        }

        axios.patch('http://localhost:8000/edit/roadtrip', data).then((res)=>{
            console.log(res);
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    render() {
        return (<div className="col-12 text-right mb-2">
           <span className="btn btn-primary" onClick={this.edit}>Edit</span>
        </div>);
    }
}