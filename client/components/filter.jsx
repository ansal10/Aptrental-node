import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputRange, {Range} from 'react-input-range';
import Choose from "./choose";
import { Field, reduxForm } from 'redux-form';
import {notify} from 'react-notify-toast';
import {Button} from 'react-bootstrap';
import {renderDropdownList, renderMultiselect} from "../common/forms/input-types/index";
import { validate_filters as validate }  from './../common/forms/validation';
import LaddaButton, {SLIDE_UP, XL} from "react-ladda";
import {Gen} from "../helpers/gen";
import axios from 'axios';
import {GET_PROPERTIES_ENDPOINT} from "../endpoints";



class Filter extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading: false,
            rent: {
                min: 100,
                max: 999000
            },
            builtArea: {
                min: 250,
                max: 100000
            },
            carpetArea: {
                min: 250,
                max: 100000
            }
        }
    }


    updateState(obj) {
        const newState = Gen.objectCopy(this.state);
        const key = Object.keys(obj)[0];
        const value = obj[key];

        newState[key] = value;
        this.setState(newState);
    }

    submit(data) {
        console.log(data);
        data.rent = [this.state.rent.min, this.state.rent.max];
        data.builtArea = [this.state.builtArea.min, this.state.builtArea.max];
        data.carpetArea = [this.state.carpetArea.min, this.state.carpetArea.max];

        this.props.applyFilter(data);
    }

    render(){

        const {handleSubmit} = this.props;
        return(
            <form className="filter-container" onSubmit={handleSubmit(this.submit.bind(this))} >

                <div className="form_row">
                    <Field
                        name="type"
                        component={renderMultiselect}
                        label="type:"
                        data={[ '1rk', '2rk', '1bhk', '2bhk', '3bhk', '4bhk', '5bhk', '5bhk+' ]}/>
                </div>

                <div className="form_row">
                    <Field
                        name="furnishingStatus"
                        component={renderMultiselect}
                        label="furnishingStatus:"
                        data={[ 'furnished', 'unfurnished', 'semifurnished' ]}/>
                </div>

                <div className="form_row">
                    <Field
                        name="powerBackup"
                        component={renderMultiselect}
                        label="powerBackup:"
                        data={[ 'full', 'partial', 'no' ]}/>
                </div>

                <div className="form_row">
                    <Field
                        name="availableFor"
                        component={renderMultiselect}
                        label="availableFor:"
                        data={[ 'all', 'family', 'couples', 'bachelors' ]}/>
                </div>

                <div className="form_row">
                    <Field
                        name="availability"
                        component={renderMultiselect}
                        label="availability:"
                        data={[ 'yes', 'no', 'archive' ]}/>
                </div>


                <div className="choose-container">
                    <h1 className="choose-header">
                        BUDGET
                    </h1>
                    <InputRange
                        draggableTrack
                        maxValue={999000}
                        minValue={100}
                        onChange={value => this.updateState({rent: value})}
                        value={this.state.rent} />
                </div>


                <div className="choose-container">
                    <h1 className="choose-header">
                        Built Area
                    </h1>
                    <InputRange
                        draggableTrack
                        maxValue={100000}
                        minValue={250}
                        onChange={value => this.updateState({builtArea: value})}
                        value={this.state.builtArea} />
                </div>

                <div className="choose-container">
                    <h1 className="choose-header">
                        Carpet Area
                    </h1>
                    <InputRange
                        draggableTrack
                        maxValue={100000}
                        minValue={250}
                        onChange={value => this.updateState({carpetArea: value})}
                        value={this.state.carpetArea} />
                </div>

                <div className="filter-button form_buttons">
                    <LaddaButton
                        type="submit"
                        className="btn btn-add first"
                        data-color="#eee"
                        data-size={XL}
                        data-style={SLIDE_UP}
                        data-spinner-size={30}
                        data-spinner-color="#ddd"
                        data-spinner-lines={12}
                    >
                        Apply
                    </LaddaButton>
                </div>

            </form>
        )
    };
}

Filter.proptypes = {
    applyFilter: PropTypes.func.isRequired,
}

Filter = reduxForm({
    form: 'filterForm',
    validate,
    enableReinitialize: true,
})(Filter);

export default Filter;