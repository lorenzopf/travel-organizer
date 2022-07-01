import React, {Component} from "react";
import axios from "axios";


export default class Add extends Component{
    constructor(props) {
        super(props);
   this.add = this.add.bind(this);
    }

    add(){

        let data ={
            title: this.props.title,
            budget: this.props.budget,
            cities:this.props.cities,
            citiesName: this.props.citiesName,
            places: this.props.places,
            dates: this.props.dates,
            user_id:localStorage.getItem('UserId')

        }

        axios.post('http://localhost:8000/create/roadtrips', data).then((res)=>{
            console.log(res);
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    render() {
        return (<div className="col-12 text-right mb-2">
           <span className="btn btn-primary" onClick={this.add}>Add</span>
        </div>);
    }
}