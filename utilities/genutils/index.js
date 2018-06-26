
const sendJsonResponse =  (res, statusCode, message, data) => {

    let d = {};
    let key = null;
    key = statusCode >= 200 && statusCode < 300 ? 'success' : 'error';
    d[key] = {
        message: message,
        data: data
    };

    res.status(statusCode).json(d);
};

module.exports.sendJsonResponse = sendJsonResponse;
