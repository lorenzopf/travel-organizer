import React, {Component} from "react";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import  '../../style/Range.css';


export default class Range extends Component{
    constructor(props) {
        super(props);

        this.state = {
            value: { min: 0, max: 0 },
        };
    }

    render() {
        return (
            <div className="col-md-6">
                <h4>Budget</h4>
                <InputRange
                    maxValue={2000}
                    minValue={0}
                    value={ this.props.id_roadtrip ? this.props.budget : this.state.value}
                    onChange={value =>{ this.setState({ value })
                        this.props.range_budget(value.min,value.max);
                    }} />
            </div>

        );
    }

}