import React,{Component} from "react";
import axios from "axios";
import Card from './Card';

export default class RoadTripsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roadTrips: [],
            div_open:null,
            div_close:null
        }

        this.getData = this.getData.bind(this);
    }

    getRow(item , component){
        let nb = 0;

        for(nb; nb < item.length; nb++){
            if (nb % 3 == 0){
                return (<div className="row">
                    {component}
                </div>)
            }
        }
    }

    getData(){
        axios.get('http://localhost:8000/roadtrips',{}).then((response)=>{

            const  data = response.data;

            //data.push(response.data);
            console.log(data);


            let rowContents = [];
            const contents = data.reduce((acc, item, i) => {
                rowContents.push(<Card key={i} id={item._id} title={item.title} budget={item.budget} actions="view" dates={item.dates}
                                       citiesName={item.citiesName} likes={item.likes}/>);
                if (i % 4 === 3) {
                    acc.push(<div className="row">{rowContents}</div>);
                    rowContents = [];
                }
                return acc;
            },[])
            contents.push(<div className="row">{rowContents}</div>);


            this.setState({roadTrips:contents})

        }).catch((error)=>{
            console.log(error);
        });
    }


    componentDidMount() {

       this.getData();
    }

    render() {

        return (
            <div className="container">

                    {this.state.roadTrips}


        </div>);
}

}