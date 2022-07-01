import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/MapMarker.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMapMarker} from "@fortawesome/free-solid-svg-icons";



const MARKER_SIZE = 20;
export default class Marker extends Component{
    constructor(props) {
        super(props);

        this.info = React.createRef();
        this.markerSize = this.markerSize.bind(this);
        this.markerReSize = this.markerReSize.bind(this);
        this.state = {isToggleOn: true};
        this.handleClick = this.handleClick.bind(this);


    }

    markerSize(e){
        e.target.style.transform ='scale(2)';
        console.log(e.target);
    }

    markerReSize(e){
        e.target.style.transform ='scale(1)';
        e.target.style.width = '20px';
        e.target.style.height = '20px';
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }


    render() {
        return (
            <div>
                <div ref={this.info} style={this.state.isToggleOn ? {display: 'none'} : {display: 'block'}} className="map-marker-info">
                    <p>
                        {this.props.name}
                    </p>
                </div>
                <div style={{
                    position: 'absolute',
                    width: MARKER_SIZE+'px',
                    height: MARKER_SIZE+'px',
                    left: - MARKER_SIZE / 2,
                    top:- MARKER_SIZE / 2,
                    backgroundImage: "url(" +this.props.icon+")",
                    backgroundSize: "cover",
                    cursor:'pointer'
                }}
                     onMouseEnter={this.markerSize}
                     onMouseLeave={this.markerReSize}
                     onClick={this.handleClick}
                >
                </div>
            </div>

        );
    }
}