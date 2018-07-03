import React, {Component} from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Helmet } from 'react-helmet';
import InfoBlock from '../components/infoBlock';
import Feature from '../components/feature';
import {fetchPropertyAction, clearPropertyData} from "../actions";
import InternalTextBanner from '../components/banners/internalTextBanner';
import {Grid, Row, Col, Image, Button} from 'react-bootstrap';
import ImageSlider from "../components/imageSlider";
import MapContainer from "../components/map";
import TitleInfo from "../components/titleInfo";
import {Gen} from "../helpers/gen";
import {Link} from "react-router-dom";

class Property extends Component {

    componentDidMount(){
        console.log(this.props);
        this.props.fetchPropertyAction(this.props.match.params.id);
    }
    componentWillUnmount(){
        this.props.clearPropertyData();
    }

    render() {

        const {propertyData} = this.props;

        if(this.props.propertyData){
            const {id, images, title, city, country, locality, edit, latitude, longitude, availability, address, rent, builtArea, carpetArea, type, availableFrom, features, furnishingStatus, description, powerBackup, floor, createdAt, updatedAt, maintenance} = this.props.propertyData;

            return(
                <div className="property-page">
                    <Helmet bodyAttributes={{class: "postPage"}}>
                        <title>{`${this.props.propertyData.title} - React Starter Kit`}</title>
                    </Helmet>
                    {/*<InternalTextBanner Heading={this.props.propertyData.title} wrapperClass="post" />*/}
                    <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}  transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
                    <div className="main anim-appear">
                        <div className="grid">
                            <div className="column column_12_12">
                                <div className="post">
                                    <Grid>
                                        <Row className="title-row">
                                            <TitleInfo name={title} location={locality} price={`$ ${Gen.round(rent)}`} area={`${Gen.round(builtArea)} sq ft`}/>
                                            {
                                                propertyData.edit ? <Link className="right-align" to={`/property/edit/${id}`}>Edit this property</Link>: ''
                                            }
                                        </Row>
                                        <Row className="bottom-line-separator">
                                            <Col xs={12} md={6}>
                                                <div className="post_banner">
                                                    <ImageSlider images={images} />
                                                </div>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <Row>
                                                    <Col xs={6}>
                                                        <InfoBlock heading="configuration" info={type}/>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <InfoBlock heading="rent" info={`$ ${Gen.round(rent)}`}/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={6} >
                                                        <InfoBlock heading="built area" info={`${Gen.round(builtArea)} sq ft`}/>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <InfoBlock heading="carpet area" info={`${Gen.round(carpetArea)} sq ft`}/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={6} >
                                                        <InfoBlock heading="furnishing" info={furnishingStatus}/>
                                                    </Col>
                                                    <Col xs={6} >
                                                        <InfoBlock heading="Power backup" info={powerBackup}/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={6} >
                                                        <InfoBlock heading="available from" info={Gen.getAvailableString(availableFrom)}/>
                                                    </Col>
                                                    <Col xs={6} >
                                                        <InfoBlock heading="Floor" info={floor}/>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xs={6} >
                                                        <InfoBlock heading="availability" info={availability}/>
                                                    </Col>
                                                    <Col xs={6} >
                                                        <InfoBlock heading="City" info={city}/>
                                                    </Col>
                                                </Row>


                                                <Row>
                                                    <Col xs={6} >
                                                        <InfoBlock heading="created at" info={Gen.getFormattedDate(createdAt)}/>
                                                    </Col>
                                                    <Col xs={6} >
                                                        <InfoBlock heading="updated at" info={Gen.getFormattedDate(updatedAt)}/>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xs={6} >
                                                        <InfoBlock heading="maintenance monthly" info={maintenance.monthly ? `$ ${Gen.round(maintenance.monthly)}` : '-'}/>

                                                    </Col>
                                                    <Col xs={6} >
                                                        <InfoBlock heading="maintenance deposit" info={maintenance.deposit ? `$ ${Gen.round(maintenance.deposit)}` : '-'}/>
                                                    </Col>
                                                </Row>


                                                <Row>
                                                    <Col xs={6} >
                                                         <InfoBlock heading="maintenance brokerage" info={maintenance.brokerage ? `$ ${Gen.round(maintenance.brokerage)}` : '-'}/>
                                                    </Col>
                                                    <Col xs={6} >
                                                        <InfoBlock heading="maintenance annually" info={maintenance.annually ? `$ ${Gen.round(maintenance.annually)}` : '-'}/>
                                                    </Col>
                                                </Row>



                                                <Row>
                                                    <Col xs={12}>
                                                        <InfoBlock heading="address" info={address}/>
                                                    </Col>
                                                </Row>

                                            </Col>

                                        </Row>

                                        <Row className="bottom-line-separator">
                                            <Col xs={12}>
                                                <InfoBlock heading="About Property" info={description} />
                                            </Col>
                                        </Row>


                                        <h1 className="small-header">
                                            Features
                                        </h1>
                                        <Row className="feature-wrapper bottom-line-separator">
                                            {
                                                features.map((feature, i) =>
                                                    <Feature name={feature} key={i} />
                                                )
                                            }
                                        </Row>

                                        <Row>
                                            <MapContainer title={title} lat={latitude} lng={longitude} />
                                        </Row>

                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                    </ReactCSSTransitionGroup>
                </div>
            ); 
        }

        if(this.props.propertyData == null){
            return (
                <div>
                    <Helmet bodyAttributes={{class: "postPage"}}>
                        <title>{'Property Page'}</title>
                    </Helmet>
                    <InternalTextBanner Heading="" wrapperClass="post" />
                    <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}  transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
                    <div className="main anim-appear">
                        <div className="grid">
                            <div className="column column_12_12">
                                <div className="post">
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    </ReactCSSTransitionGroup>
                </div>
            );
        }

        if(this.props.propertyData == false){
            return (
                <div>
                    <Helmet bodyAttributes={{class: "postPage"}}>
                        <title>{'404 not found'}</title>
                    </Helmet>
                    <InternalTextBanner Heading="404 not found" wrapperClass="post" />
                    <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}  transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
                    <div className="main anim-appear">
                        <div className="grid">
                            <div className="column column_12_12">
                                <div className="post">
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                    </ReactCSSTransitionGroup>
                </div>
            );
        }

    }
  }

function mapStateToProps(state){
    return {
        propertyData: state.property,
    };
};

function loadData(store, landingPageID){
    return store.dispatch(fetchPropertyAction(landingPageID));
}

export default {
    loadData,
    component: connect(mapStateToProps, { fetchPropertyAction, clearPropertyData })(Property)
};

