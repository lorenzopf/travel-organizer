import React, { Component } from "react";
import axios from "axios";
import '../style/LoginPage.css';
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import  Filters from './DashboardComponents/Filters';
import InputTags from "./DashboardComponents/InputTags";
import Range from "./DashboardComponents/Range";
import Map from "./DashboardComponents/Map";
import DatePicker from "./DashboardComponents/DatePicker";
import Add from "./DashboardComponents/Add";
import Edit from "./DashboardComponents/Edit";
import TitleInput from "./DashboardComponents/TitleInput";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

export default class DashboardPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            map_info:{places:[],cities: [],title:"",citiesName:""},
            places_to_filter: "",
            budget:{min:"",
                max:""},
            dates: {departure:"", arrival:""},
            title:"",
            edit:null,
            dash:null,
            roadTripId:""

        }
        };

    map_info=(data_from_child, cities,citiesName)=>{
        console.log(citiesName);
        this.setState({map_info:{places: data_from_child, cities: cities, citiesName:citiesName}});
    }

    componentDidMount() {


        if(this.props.match) {
            const {match: {params}} = this.props;

            if (params.id && params.action == "edit") {


                axios.get(`http://localhost:8000/roadtrip/${params.id}`).then((response) => {

                        this.setState({
                            map_info: {
                                places: response.data.places,
                                cities: response.data.cities,
                                citiesName: response.data.citiesName
                            },
                            budget: response.data.budget,
                            dates: response.data.dates,
                            title: response.data.title,
                            edit: true,
                            dash:false,
                            roadTripId:params.id
                        });
                    console.log(this.state.edit);
                    }
                )
                //console.log(params.id);
            }else{


                axios.get(`http://localhost:8000/roadtrip/${params.id}`).then((response) => {

                        this.setState({
                            map_info: {
                                places: response.data.places,
                                cities: response.data.cities,
                                citiesName: response.data.citiesName
                            },
                            budget: response.data.budget,
                            dates: response.data.dates,
                            title: response.data.title,
                            edit:false,
                            dash:false
                        });
                    console.log(this.state.edit);
                    }
                )
            }
        }else{
            this.setState({dash:true, edit:true});
        }
    }

    budget_range = (min, max) => {

        this.setState({budget:{min:min,max:max}});

    }

    titleF = (title) =>{
        this.setState({title:title});
    }



    date_picker= (arrival, departure)=>{
        console.log(arrival);
        this.setState({dates:{departure:departure, arrival: arrival}});
    }


    position_filter=(places_to_filter)=>{
        this.setState({places_to_filter:places_to_filter })
        //console.log(this.state.places_to_filter);
    }
    render() {
        return(<div>
            <Menu/>
            <div className="container">
                {this.state.edit && <h1>Plan your Road Trip</h1>}

                {this.state.edit == false && <div className="row justify-content-between"> <div className="col-md-6 d-flex align-items-center"><h1>Road Trip</h1></div><div className="col-md-6 d-flex align-items-center justify-content-end"><a style={{fontSize:"20px",marginLeft:"5px",color:"#000"}} href="javascript:if(window.print)window.print()"><FontAwesomeIcon icon={faPrint}/></a></div></div>}
                <hr/>
                <div className="row">
                    <div className="col-md-12">
                        {this.state.edit && <div className="row">
                             <TitleInput titleV={this.state.title} title={this.titleF.bind(this)}/>
                            <InputTags  callFromParent={this.map_info.bind(this)} locations={this.state.map_info.citiesName} position_filter={this.position_filter.bind(this)}/>
                        </div>}

                        { this.state.edit == false &&
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>Titre</h4>
                                    <p>{this.state.title}</p>
                                </div>
                                <div className="col-md-6">
                                    <h4>Locations</h4>
                                    <p>{this.state.map_info.citiesName}</p>
                                </div>
                            </div>
                    }
                    </div>
                    <div className="col-md-12 mt-2">
                        {this.state.edit   && <div className="row align-items-center">
                            <Range id_roadtrip={this.state.roadTripId} budget={this.state.budget} range_budget={this.budget_range.bind(this)}/>
                            <DatePicker dates={this.state.dates} date_picker={this.date_picker.bind(this)}/>
                        </div>}

                        {this.state.edit == false &&
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h4>Budget</h4>
                                <span>Min: {this.state.budget.min} </span>
                                <span>Max: {this.state.budget.max}</span>
                            </div>
                            <div className="col-md-6">
                                <h4>Dates</h4>
                                <span>Departure: {this.state.dates.departure} </span>
                                <span>Arrival: {this.state.dates.arrival}</span>
                            </div>
                        </div>}
                    </div>
                    <Filters callFromParent={this.map_info.bind(this)} places_to_filter={this.state.places_to_filter}/>
                    {this.state.dash  &&  <Add  title={this.state.title} places={this.state.map_info.places} cities={this.state.map_info.cities} citiesName={this.state.map_info.citiesName} dates={this.state.dates} budget={this.state.budget}/>}
                    {this.state.edit && this.state.dash != true  &&  <Edit roadtripId={this.state.roadTripId} title={this.state.title} places={this.state.map_info.places} cities={this.state.map_info.cities} citiesName={this.state.map_info.citiesName} dates={this.state.dates} budget={this.state.budget}/>}
                    <div className="col-md-12">
                        <Map places={this.state.map_info.places} cities={this.state.map_info.cities} />
                    </div>
                </div>
            </div>
                <Footer/>
            </div>
        )
    }
}
