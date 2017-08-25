'use strict';

const ResponseFormatter = require('../utils/response-formatter');
const responseFormatter = new ResponseFormatter();

module.exports = function(app) {
    app.use(onFulfilled);
    app.use(onRejected);
    app.use(handleValidationErrors);
    app.use(handleObjAffected);
    app.use(onUnauthorized);
    app.use(handleObjFound);
};

function onFulfilled(req, res, next) {
    /**
     * Handling successful results in Promises
     * @param {object} data Result
     */
    res.onFulfilled = function(data) {
        if (!data) {
            res.onRejected(responseFormatter.getBadRequestObj());
            return;
        }

        sendResponse(res, data);
    };

    next();
}

function onRejected(req, res, next) {
    /**
     * Handling errors in Promises
     * @param {object} data  Error object
     */
    res.onRejected = function(data) {
        if (data.name) {
            data = responseFormatter.getErrorObjByName(data);
        } else {
            data = responseFormatter.getErrorObjByCode(data);
        }

        sendResponse(res, data);
    };

    next();
}

function handleValidationErrors(req, res, next) {
    /**
     * Passes to send the Validation error object
     */
    res.handleValidationErrors = function(errors) {
        const data = responseFormatter.getValidationErrObj(errors);
        sendResponse(res, data);
    };

    next();
}

function handleObjAffected(req, res, next) {
    /**
     * It takes 'affected' from ORM.
     * If the object was changed sends object's id,
     * if the object was not found, sends 404
     * @param affectedRow
     */
    res.handleObjAffected = function(affectedRow) {
        let isArray = Array.isArray(affectedRow);
        if (!isArray && affectedRow || isArray && affectedRow[0]) {
            let objId = parseInt(req.params.id);
            res.onFulfilled(objId);
        } else {
            let data = responseFormatter.getNotFoundObj();
            sendResponse(res, data);
        }
    };

    next();
}

function handleObjFound(req, res, next) {
    /**
     * If the object was Found sends object,
     * if the object was not Found, sends 404
     * @param searchResult
     */
    res.handleObjFound = function(searchResult) {
        if (!searchResult) {
            let data = responseFormatter.getNotFoundObj();
            sendResponse(res, data);
        } else {
            sendResponse(res, searchResult);
        }
    };

    next();
}

function onUnauthorized(req, res, next) {
    /**
     * if auth is failed, sends 401
     */
    res.onUnauthorized = function() {
        let data = responseFormatter.getInvalidLoginOrPassErrObj();
        sendResponse(res, data);
    };

    next();
}

/**
 * Send  response
 * @param {object} res Used to config and send response
 * @param {object} data response object
 */
function sendResponse(res, data) {
    res.set('Content-Type', 'application/json');
    if (data.code && data.code !== 200) {
        res.status(data.code).end(responseFormatter.formatResponse(data, null));
        return;
    }

    res.end(responseFormatter.formatResponse(null, data));

}