'use strict';

module.exports = class ResponseService {

    /**
     * Returns an object of an error if data param's "code" field matches the listed codes.
     * Or Returns unchanged data object if there is no matches found in code list.
     *
     * Process codes: [400, 403, 404]
     *
     * @param {Object} data
     * @return {Object}
     */
    getErrorObjByCode(data) {
        switch (data.code) {
            case 400:
                data = this.getBadRequestObj();
                break;
            case 403:
                data = this.getForbiddenErrorObj();
                break;
            case 404:
                data = this.getNotFoundObj();
                break;
            default:
                break;
        }

        return data;
    }

    /**
     * Returns an object of an error if data param's "name" field matches the listed names.
     * Or Returns unchanged data object if there is no matches found in name list.
     * @param {Object} data
     * @return {Object}
     */

    getErrorObjByName(data) {
        return data;
    }

    /**
     * Returns a json string in the next format:
     *
     * Successful request:
     * {
     *      "status": "success",
     *      "data": { *Application-specific data would go here. }
     * }
     * Failed request:
     * {
     *      "status": "error",
     *      "code": 123,
     *      "message": "Error message",
     *      "errors": [ *error details ]
     * }
     *
     * @param {object/null} err  If is not an error, we pass a null, else - object of error
     * @param {object} info Object with data to send
     */
    formatResponse(err, info) {
        var obj = {};
        if (!err) {
            obj.status = 'success';
            obj.data = info;
        } else {
            obj.status = 'error';
            obj.code = err && err.code;
            obj.message = err && err.message || err;

            if (err.errors) {
                obj.errors = err.errors;
            }
        }


        return JSON.stringify(obj, null, '\t');


        //return JSON.stringify(obj);
    }

    /**
     * Returns an object of an error "Access Denied"
     * @return {{message: string, code: number}}
     */
    getForbiddenErrorObj() {
        return {
            message: "accessDenied",
            code: 403
        };
    }

    /**
     * Creates an object error from the Database object error, and returns this.
     * @param error
     * @return {{message: string, errors: *[], code: number}}
     */
    getDatabaseErrorObj(error) {
        return {
            message: error.name,
            errors: [{
                field: error.errors[0].path,
                message: error.errors[0].message,
                value: error.errors[0].value
            }],
            code: 400
        };
    }

    /**
     * Creates an object error from the Database ForeignKey object error, and returns this
     * @param error
     * @return {{message: string, errors: *[], code: number}}
     */
    getDatabaseForeignKeyObj(error) {
        return {
            message: error.name,
            errors: [{
                field: error.index,
                message: error.name,
                value: error.value
            }],
            code: 400
        };
    }

    /**
     * Creates an object error from the Database Validation object error, and returns this.
     * @param error
     * @return {{message: string, errors: *[], code: number}}
     */
    getDatabaseValidationErrorObj(error) {
        return {
            message: error.name,
            errors: [{
                field: error.errors[0].path,
                message: error.errors[0].message,
                value: error.errors[0].value.value
            }],
            code: 400
        };
    }

    /**
     * Returns an object of an error "Bad request"
     * @return {{message: *}}
     */
    getBadRequestObj() {
        return {
            message: "badRequest",
            code: 400
        };
    }

    /**
     * Returns an object of an error "Not found"
     * @return {{message: *}}
     */
    getNotFoundObj() {
        return {
            message: "notFound",
            code: 404
        };
    }

    /**
     * Returns an object of a Validation error
     * @param errors
     * @return {{message: *, body: *}}
     */
    getValidationErrObj(errors) {
        return {
            message: "validationError",
            errors: errors,
            code: 400
        };
    }

    /**
     * Returns an object of an error "Invailid login or pass"
     * @return {{message: *, code: number}}
     */
    getInvalidLoginOrPassErrObj() {
        return {
            message: "invalidLoginOrPass",
            code: 401
        };
    }
};