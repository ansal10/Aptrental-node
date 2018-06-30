import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputRange, {Range} from 'react-input-range';
import Choose from "./choose";

import {Button} from 'react-bootstrap';


class Filter extends Component {

    constructor(props){
        super(props);

        this.state = {
            priceRange: {
                min: 0,
                max: 10
            }
        }
    }

    render(){
        return(
            <div className="filter-container">
                <Choose title="CONFIGURATIONS" options={["1 RK", "1 BHK", "2 BHK", "3 BHK", "3+ BHK"]}/>

                <Choose title="Furnishing" options={["Fully furnished", "Semi furnished", "Unfurnished"]}/>
                <Choose title="Listed By" options={["Agent", "Broker"]}/>
                <Choose title="Lease Type" options={["Company", "Family", "Bachelor"]}/>


                <div className="choose-container">
                    <h1 className="choose-header">
                        BUDGET
                    </h1>
                    <InputRange
                        draggableTrack
                        maxValue={20}
                        minValue={0}
                        onChange={value => this.setState({ priceRange: value })}
                        onChangeComplete={value => console.log(value)}
                        value={this.state.priceRange} />
                </div>


                <Button className="filter-button" bsStyle="success" bsSize="large" block > Apply </Button>
            </div>
        )
    };
}

Filter.propTypes = {
    Heading: PropTypes.string,
    Info: PropTypes.any,
}

export default Filter;