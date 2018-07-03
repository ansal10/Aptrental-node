import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Grid, Row, Col} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import InternalTextBanner from '../components/banners/internalTextBanner';
import {fetchPropertiesAction} from '../actions';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';
import PropertyCard from "../components/propertyCard";
import Filter from "../components/filter";
import MultipleMapContainer from "../components/mapMultiple";
import MapContainer from "../components/map";

class Properties extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showFilterOnMobile: false
        };
    }


    componentDidMount(){
        this.props.fetchPropertiesAction();
    }

    renderProperties() {
        if (this.props.properties != false) {
            const propertiesData = this.props.properties.map((property, index) => {
                return (
                    <div key={index} className="property">
                        <PropertyCard property={property}/>
                    </div>
                );
            });

            return (<div>
                {propertiesData}
                    <div className={`${this.props.nextUrl ? '' : 'hidden'} load-more-container`}>
                        <div className="load-more"> Load more</div>
                    </div>
                </div>
            );
        }
    }

    shouldShowMap() {
        return this.props.location.pathname.includes("/properties/map");
    }

    renderPropertiesOnMap() {
        if (this.props.properties) {
            const coordinates = this.props.properties.map((property, i) => {
                const {latitude, longitude, id} = property;
                return {latitude, longitude, id};
                // return {latitude: 40.741895, longitude: -73.989308};
            });


            return (
                <MultipleMapContainer title="Property search" coordinates={coordinates}/>
            )

        }
    }

    showFilter() {
        this.setState({
            showFilterOnMobile: true
        })
    }

    hideFilter() {
        this.setState({
            showFilterOnMobile: false
        })
    }


    head(){
        return (
            <Helmet bodyAttributes={{class: "postsPage"}}>
                <title>{`Properties Page`}</title>
            </Helmet>
        );
    }

    fetchPropertyAndHideFilterOnMobile(data) {
        this.props.fetchPropertiesAction(data);
        this.hideFilter();
    }

    displayNavLink(isMap) {
        return isMap ? <Link className="right-align" to="/properties">See properties list</Link> : <Link className="right-align" to="/properties/map">See properties on map</Link>
    }

    render() {

        const isMap = this.shouldShowMap();

        const {properties} = this.props;
        if(this.props.properties){
            return(
                <div className="properties-page">
                    {this.head()}
                    <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}  transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
                    <div className="main anim-appear">
                        <Grid className="properties">

                            <Row>
                                {this.displayNavLink(isMap)}
                            </Row>

                            <div className={`${this.state.showFilterOnMobile ? 'mobile-hidden' : 'mobile-displayed'} show-filter-button`} onClick={this.showFilter.bind(this)}>
                                filter
                            </div>

                            <Row>
                                <Col className={`${!this.state.showFilterOnMobile ? 'mobile-hidden' : 'mobile-displayed'}`} xs={12} md={4}>
                                    <Filter applyFilter={this.fetchPropertyAndHideFilterOnMobile.bind(this)}/>
                                </Col>
                                <Col className={`${this.state.showFilterOnMobile ? 'mobile-hidden' : 'mobile-displayed'}`} xs={12} md={8}>
                                    {
                                        (properties.length > 0) ? (
                                            isMap ? this.renderPropertiesOnMap() : this.renderProperties())
                                         :
                                           <div className="no-result">
                                            <h2> Oops!!! No Results</h2>
                                            <h2> Try to widen your search</h2>
                                           </div>
                                    }
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                    </ReactCSSTransitionGroup>
                </div>
            );
        } else {
            return (
                <div>
                    {this.head()}
                    <InternalTextBanner Heading="" wrapperClass="posts" />
                    <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}  transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
                        <div className="main anim-appear">
                            <div className="grid">
                                <div className="column column_8_12">
                                    <div className="posts">

                                    </div>
                                </div>
                                <div className="column column_4_12">

                                </div>
                            </div>
                        </div>
                    </ReactCSSTransitionGroup>
                </div>);
        }
  }
}

function mapStateToProps(state){
    return {
        properties: state.properties.arr,
        nextUrl: state.properties.nextUrl
    };
};

function loadData(store){
    return store.dispatch(fetchPropertiesAction());
}

export default {
    loadData,
    component: connect(mapStateToProps, { fetchPropertiesAction })(Properties)
};

