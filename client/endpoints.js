const config = require('../webConfig.json');


export const landingPageAPI = '/simple/v1/cjhm2fr577kni01706tr0xvst';

export const GET_PROPERTY_ENDPOINT = config.axiosInstance_baseURL+'/api/v1/house';
export const GET_PROPERTIES_ENDPOINT = config.axiosInstance_baseURL+'/api/v1/house/search';
export const CREATE_PROPERTY_ENDPOINT = config.axiosInstance_baseURL+'/api/v1/house';
export const UPDATE_PROPERTY_ENDPOINT = config.axiosInstance_baseURL+'/api/v1/house';
export const SIGN_UP_ENDPOINT_POST = config.axiosInstance_baseURL+'/api/v1/user/signup';
export const LOG_IN_ENDPOINT_POST = config.axiosInstance_baseURL+'/api/v1/user/login';
export const UPDATE_USER_ENDPOINT_PUT = config.axiosInstance_baseURL+'/api/v1/user/login';
export const GET_USER_DETAILS = config.axiosInstance_baseURL+'/api/v1/user/details';
export const UPLOAD_IMAGE_ENDPOINT = config.axiosInstance_baseURL+'/api/v1/uploads/images';
export const LOGOUT_USER = config.axiosInstance_baseURL+'/api/v1/user/logout';


