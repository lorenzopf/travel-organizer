import React, { Component} from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from "axios";
import InputPlaces from 'react-google-places-autocomplete'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/SearchInput.css'
// If you want to use the provided css

const ENTER_KEY = 13;

export default class InputTags extends Component{

    constructor(props) {
        super(props);
        this.citiesRef = React.createRef();

        this.state = {
            data: null,
            cities: null
        }

        this.handleKeyDown = this.handleKeyDown.bind(this);

    }



    handleKeyDown(e) {
        let str = e.target.value;
        let lastC = str.charAt(str.length-1);
        let data_array = [];
        if (e.keyCode === ENTER_KEY && lastC != ',') {
            axios.get('http://localhost:8000/find/?address='+str)
                .then( (response)=> {
                    // handle success
                    //data_array.push(response.data)
                    this.props.position_filter(response.data);
                    axios.post('http://localhost:8000/all', response.data).then((res)=>{


                        let data = res.data.map((item)=>{

                            let obj = {}
                            obj['latitude'] = item.location.lat;
                            obj['longitude'] = item.location.lng;
                            obj['icon'] = item.icon;
                            obj['name'] =  item.name
                            return obj;
                        });

                       // console.log(data);
                        for(let i = 0; i < response.data.length; i++){
                            data.push({latitude: response.data[i].latitude, longitude: response.data[i].longitude});
                        }

                        this.setState({ data: data, cities:response.data })

                        this.props.callFromParent(this.state.data,this.state.cities,this.citiesRef.current.value);
                    }).catch(function (error) {
                        // handle error
                        console.log(error);
                    })

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })


        }

    }




    render() {
        return (
                    <div className="col-md-6">
                        <input type="text" ref={this.citiesRef} onChange={this.locationsV} onKeyDown={this.handleKeyDown} className="form-control dash-input" placeholder="Address" defaultValue={this.props.locations}/>
                    </div>

            );
    }

}