import {
    landingPageAPI, GET_PROPERTY_ENDPOINT, GET_PROPERTIES_ENDPOINT, SIGN_UP_ENDPOINT_POST, GET_USER_DETAILS,
    LOGOUT_USER
} from './endpoints';
import {actions} from './constants';


export const fetchUserDetails = () => async (dispatch, getState, api) => {

    await api.get(GET_USER_DETAILS).then(response => {
        dispatch({
            type: actions.FETCH_USER_DATA,
            payload: response.data
        })
    }).catch((err) => {
        console.log('error', err);
    })

};

export const clearUserDetails = () => async (dispatch, getState, api) => {

    await api.post(LOGOUT_USER, {}).then(response => {
        dispatch({
            type: actions.CLEAR_USER_DATA,
            payload: response.data
        })
    }).catch((err) => {
        console.log('error', err);
    })

};



export const fetchPropertyAction = (productID) => async (dispatch, getState, api) => {

    await api.get(GET_PROPERTY_ENDPOINT+'/'+productID).then(response => {
        dispatch({
            type: 'FETCH_PROPERTY',
            payload: response.data.success.data
        })
    }).catch((err) => {
        console.log('error', err.data.error.data);
    })

};

export const fetchPropertiesAction = (data) => async (dispatch, getState, api) => {

    await api.post(GET_PROPERTIES_ENDPOINT, data).then(response => {
        dispatch({
            type: 'FETCH_PROPERTIES',
            payload: response.data
        })
    }).catch((err) => {
        console.log('error', err.data.error.data);
    })

};

export const clearPropertyData = () => (dispatch) => {
    dispatch({
        type: 'CLEAR_PROPERTY_DATA'
    })
};

export const fetchPost = (postID) => async (dispatch, getState, api) => {

    const _query = {
        query: `{
            Blog(slug: "${postID}"){
                postTitle
                post
                imageURL
            }
        }`
    };

    await api.post(landingPageAPI, _query).then(response => {
        dispatch({
            type: 'FETCH_POST',
            payload: response.data
        })
    }).catch((err) => {
        console.log('error', err);
    })
    
};

export const fetchPosts = () => async (dispatch, getState, api) => {

    const _query = {
        query: `{
            allBlogs {
                postTitle
                shortdescription
                slug
                imageURL
              }
        }`
    };

    await api.post(landingPageAPI, _query).then(response => {
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        })
    }).catch((err) => {
        console.log('error', err);
    })
    
};

export const clearPostData = () => (dispatch) => {
    dispatch({
        type: 'CLEAR_POST_DATA'
    })
};


