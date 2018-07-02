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

class Properties extends Component {

    componentDidMount(){
        this.props.fetchPropertiesAction();
    }

    renderProperties(){
        if(this.props.properties != false){
        return this.props.properties.map((property, index) => {
            return (
                <div key={index} className="property">
                    <PropertyCard property={property}/>
                </div>
            );
        })
        }
    }

    head(){
        return (
            <Helmet bodyAttributes={{class: "postsPage"}}>
                <title>{`Posts - React Starter Kit`}</title>
            </Helmet>
        );
    }

    render() {

        const {properties, fetchPropertiesAction} = this.props;
        if(this.props.properties){
            return(
                <div className="properties-page">
                    {this.head()}
                    <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true}  transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
                    <div className="main anim-appear">
                        <Grid className="properties">
                            <Row>
                                <Col xs={12} md={4}>
                                    <Filter applyFilter={fetchPropertiesAction}/>
                                </Col>
                                <Col xs={12} md={8}>
                                    {
                                        (properties.length > 0) ?
                                        this.renderProperties():
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
        properties: state.properties.arr
    };
};

function loadData(store){
    return store.dispatch(fetchPropertiesAction());
}

export default {
    loadData,
    component: connect(mapStateToProps, { fetchPropertiesAction })(Properties)
};

