import React, {Component, Fragment} from "react";
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";
import isEmpty from 'lodash.isempty';

// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();

    places.forEach((place) => {
        bounds.extend(new maps.LatLng(
            place.latitude,
            place.longitude,
        ));
    });
    return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
        maps.event.addDomListener(window, 'resize', () => {
            map.fitBounds(bounds);
        });
    });
};

const calculation = (map, maps, places, cities,origin_d)=>{

    const directionsDisplay = new maps.DirectionsRenderer({
        draggable: true
    });
    const  directionsService = new maps.DirectionsService();
    let origin = new maps.LatLng(origin_d.lat, origin_d.lng);
    let destination= new maps.LatLng(parseFloat(cities[cities.length - 1].latitude), parseFloat(cities[cities.length - 1].longitude));
    let mapWaypoints= cities.map(item => {
        let obj = {};
        obj['location'] = new maps.LatLng(parseFloat(item.latitude),parseFloat(item.longitude));
        obj['stopover'] = false;
        return obj;
    });


    directionsDisplay.setMap(map);
    var request = {
        origin: origin,
        destination: destination,
        waypoints: mapWaypoints,
        optimizeWaypoints: true,
        travelMode: maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }})
}

// Fit map to its bounds after the api is loaded
let apiIsLoaded =  (map, maps, places, cities,origin_d) => {
    // Get bounds by our places

    const bounds = getMapBounds(map, maps, places);
    console.log(cities);
     calculation(map, maps, places, cities,origin_d);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
};

export default class Map extends Component{

    constructor(props) {
        super(props);

        this.state = {
            center: {
                lat: 46.603354,
                lng: 1.8883335
            },
            zoom: 11
        };

        this.getLocation = this.getLocation.bind(this);
        this.yourPosition = this.yourPosition.bind(this);
    }

    componentDidMount() {
        this.getLocation();
    }

    getLocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.yourPosition);
        }else{
            alert('we can\'t find your position');
        }
    }

    yourPosition(position){
        this.setState({
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
            zoom: 11
        })
    }
    /* static defaultProps = {
         center: {
             lat: 59.95,
             lng: 30.33
         },
         zoom: 11
     };*/


    render() {


        return (

            <div style={{ height: '100vh', width: '100%' }}>

                {this.props.places.length > 0 && (
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyA1Yh41Kn0sfduiiMLHOo3lOA6iqjsyp3k" }}
                        defaultZoom={this.state.zoom}
                        defaultCenter={this.state.center}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, this.props.places, this.props.cities,this.state.center)}
                    >

                        {this.props.places.map((place,index) => (
                            <Marker
                                key={index}
                                name={place.name}
                                lat={place.latitude}
                                lng={place.longitude}
                                icon={place.icon}
                            />
                        ))}
                    </GoogleMapReact>
                )}
                {
                    this.props.places.length == 0 && (
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyA1Yh41Kn0sfduiiMLHOo3lOA6iqjsyp3k"}}
                            defaultZoom={this.state.zoom}
                            defaultCenter={this.state.center}
                        >
                        </GoogleMapReact>
                    )
                }
            </div>
        );
    }
}