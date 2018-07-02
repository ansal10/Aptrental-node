import React, {Component} from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import {Link, NavLink} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { validate_addProperty as validate }  from './../common/forms/validation';
import { renderTextField, renderTextarea } from './../common/forms/input-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import InternalTextBanner from './../components/banners/internalTextBanner';

import axios from 'axios';
import {renderDateTimePicker, renderDropdownList} from "../common/forms/input-types/index";

class AddPropertyPage extends Component {

  submit(data){
    console.log(data);
    
    axios.post('/sendmail', data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  head(){
    return (
        <Helmet bodyAttributes={{class: "contactPage"}}>
          <title>{`Add/Edit Property`}</title>
        </Helmet>
    );
  }

    render() {
      const { handleSubmit } = this.props;

      return (
          
          <section className="contactPage_wrap">
          {this.head()}
            <InternalTextBanner Heading="Contact" wrapperClass="contact" />
            <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}  transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
            <div className="main anim-appear">
                  <div className="grid">
                      <div className="column column_12_12">
                        <div className="content_block">

                          <form className="add-property-container" onSubmit={handleSubmit(this.submit.bind(this))}>

                            <div className="form_wrap">

                              <div className="form_row">
                                <Field
                                  name="title"
                                  component={renderTextField}
                                  label="Title:"
                                />
                              </div>

                              <div className="form_row">
                                <Field
                                  name="country"
                                  component={renderTextField}
                                  label="country:"
                                />
                              </div>

                              <div className="form_row">
                                <Field
                                  name="city"
                                  component={renderTextField}
                                  label="city:"
                                />
                              </div>

                                <div className="form_row">
                                    <Field
                                        name="locality"
                                        component={renderTextField}
                                        label="locality:"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="rent"
                                        component={renderTextField}
                                        label="rent:"
                                        type="number"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="builtArea"
                                        component={renderTextField}
                                        label="builtArea:"
                                        type="number"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="carpetArea"
                                        component={renderTextField}
                                        label="carpetArea:"
                                        type="number"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="latitude"
                                        component={renderTextField}
                                        label="latitude:"
                                        type="number"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="longitude"
                                        component={renderTextField}
                                        label="longitude:"
                                        type="number"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="type"
                                        component={renderDropdownList}
                                        label="type:"
                                        data={[ '1rk', '2rk', '1bhk', '2bhk', '3bhk', '4bhk', '5bhk', '5bhk+' ]}/>
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="availability"
                                        component={renderDropdownList}
                                        label="availability:"
                                        data={[ 'yes', 'no', 'archive' ]}/>
                                </div>


                                <div className="form_row">
                                    <Field
                                        name="availableFrom"
                                        component={renderDateTimePicker}
                                        showTime={false}
                                        label="availableFrom:"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="description"
                                        component={renderTextarea}
                                        label="description:"
                                    />
                                </div>


                                <div className="form_row">
                                    <Field
                                        name="availableFor"
                                        component={renderDropdownList}
                                        label="availableFor:"
                                        data={[ 'all', 'family', 'couples', 'bachelors' ]}/>
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="floor"
                                        component={renderTextField}
                                        label="floor:"
                                        type="number"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="address"
                                        component={renderTextarea}
                                        label="address:"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="powerBackup"
                                        component={renderDropdownList}
                                        label="powerBackup:"
                                        data={[ 'full', 'partial', 'no' ]}/>
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="amenities"
                                        component={renderDropdownList}
                                        label="amenities:"
                                        data={[ 'bathroom','bedroom','study room','ac installed','curtains','chimney','exhaust','fans','lights','tv','wardrobe','bed','dinning table','fridge','sofa','stove','washing machine' ]}/>
                                </div>


                                <div className="form_row">
                                    <Field
                                        name="maintenance.monthy"
                                        component={renderTextField}
                                        label="maintenance monthly:"
                                        type="number"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="maintenance.deposit"
                                        component={renderTextField}
                                        label="maintenance deposit:"
                                        type="number"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="maintenance.brokerage"
                                        component={renderTextField}
                                        label="maintenance brokerage:"
                                        type="number"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="maintenance.annually"
                                        component={renderTextField}
                                        label="maintenance annually:"
                                        type="number"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="features"
                                        component={renderTextField}
                                        label="features:"
                                    />
                                </div>

                                <div className="form_row">
                                    <Field
                                        name="furnishingStatus"
                                        component={renderDropdownList}
                                        label="furnishingStatus:"
                                        data={[ 'furnished', 'unfurnished', 'semifurnished' ]}/>
                                </div>


                                <div className="form_buttons">
                                <button className="btn-add btn first" type="submit">
                                  Create/Update property
                                </button>
                              </div>

                            </div>

                          </form>

                        </div>
                      </div>
                  </div>
              </div>
              </ReactCSSTransitionGroup>
          
          </section>
        
      );
    }
  }


AddPropertyPage = reduxForm({
      form: 'contactForm',
      validate,
      enableReinitialize: true,
  })(AddPropertyPage);

export default {
  component: AddPropertyPage
};