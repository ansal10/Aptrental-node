import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import {actions} from './constants';
import {Gen} from "./helpers/gen";


const userReducer = function(state = null, action){

    switch(action.type){
        case actions.FETCH_USER_DATA:
            return action.payload.success.data || null;
        case actions.CLEAR_USER_DATA:
            return null;
        default:
            return state;
    }
}


const postReducer = function(state = null, action){

    switch(action.type){
        case 'FETCH_POST':
            return action.payload.data.Blog || false;
        case 'CLEAR_POST_DATA':
            return null;
        default:
            return state;
    }
}


const postsReducer = function(state = {
    posts: null
}, action){
    switch(action.type){
        case 'FETCH_POSTS':
            return {...state, arr: action.payload.data.allBlogs || false};
        default:
            return state;
    }
}

const propertyReducer = function(state = null, action){

    switch(action.type){
        case 'FETCH_PROPERTY':
            return action.payload || false;
        case 'CLEAR_PROPERTY_DATA':
            return null;
        default:
            return state;
    }
}

const propertiesReducer = function(state = {
    properties: null
}, action){
    switch(action.type){
        case 'FETCH_PROPERTIES':
            const merge = action.merge;
            let newProperties = action.payload.success.data;
            if(merge) {
                newProperties = Gen.mergeArray(state.arr, newProperties);
            }

            const data = {
                arr: newProperties,
                nextUrl: action.payload.nextUrl
            };
            return {...state, ...data || null};

        case 'CLEAR_NEXT_URL':
            return {... state, nextUrl: null};
        default:
            return state;
    }
}

export default combineReducers({
    form: formReducer,
    posts: postsReducer,
    post: postReducer,
    property: propertyReducer,
    properties: propertiesReducer,
    user: userReducer,
});