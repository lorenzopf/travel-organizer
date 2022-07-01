import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/SearchInput.css';
export default class TitleInput extends Component {
    constructor(props) {
        super(props);
        this.titleValue = React.createRef();
        this.titleV = this.titleV.bind(this);
    }

    titleV(){
        this.props.title(this.titleValue.current.value);
    }

    render() {
        console.log(this.props.titleV);
        return(
            <div className="col-md-6">
                <input type="text" ref={this.titleValue} onChange={this.titleV}  className="form-control dash-input" placeholder="title" value={this.props.titleV}/>
            </div>
        )
    }
}

