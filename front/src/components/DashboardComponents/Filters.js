import React, { Component } from "react";
import axios from "axios";
import "../../style/Filter.css"
import { faUtensils, faBed, faBus, faCocktail, faRunning, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';




    export default class Filters extends Component{

        constructor(props) {
            super(props);

            this.filter = this.filter.bind(this);

            this.state = {
                data: null
            }

        }



        filter(e){
           let filter = e.currentTarget.dataset.filter;
           let position =  this.props.places_to_filter;
            console.log(position);
            axios.post('http://localhost:8000/'+filter,position)
                .then( (response)=> {

                    let data = response.data.map((item)=>{

                        let obj = {}
                        obj['latitude'] = item.location.lat;
                        obj['longitude'] = item.location.lng;
                        obj['icon'] = item.icon;
                        obj['name'] =  item.name
                        return obj;
                    });


                    this.setState({ data: data })

                    this.props.callFromParent(data);
                }).catch(function (error) {
                // handle error
                console.log(error);
            })


        }
        render() {
            return (
                <div className="col-md-12">
                    <div className="row justify-content-around">
                        <span onClick={this.filter} data-filter="all"   className="d-inline-block item-filter"><FontAwesomeIcon  icon={faGlobe} /></span>
                        <span onClick={this.filter} data-filter="enjoy"   className="d-inline-block item-filter"><FontAwesomeIcon  icon={faRunning} /></span>
                        <span onClick={this.filter} data-filter="sleep"   className="d-inline-block item-filter"><FontAwesomeIcon icon={faBed} /></span>
                        <span onClick={this.filter} data-filter="travel"  className="d-inline-block item-filter"><FontAwesomeIcon icon={faBus} /></span>
                        <span onClick={this.filter} data-filter="eat"   className="d-inline-block item-filter"><FontAwesomeIcon icon={faUtensils} /></span>
                        <span onClick={this.filter} data-filter="drink"   className="d-inline-block item-filter"><FontAwesomeIcon icon={faCocktail} /></span>
                    </div>
                </div>
            );
        }
}