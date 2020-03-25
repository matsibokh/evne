const request = require('request');

function doRequest(options) {
    return new Promise((resolve, reject) => {
        request(options,
            function (error, response, body) {
                if (error) {
                    reject(error, response);
                }
                resolve(body);
            })
    })
}

function wrapPromiseResponse(responseHandler) {
    return function(req, res) {
        try{
            responseHandler(req, res).then( result =>{
                res.send(result);
            }).catch( error => {
                const statusCode = error.status || 500;
                console.error(error);
                res.status(statusCode).send({error: error.message});
            })
        }catch(error){

        }
    }
}

module.exports = {
    doRequest,
    wrapPromiseResponse
};