'use strict';

import { responseCodes, responseMessage } from '../assets/response/response-codes.js';

class ApiResponse {
    constructor(
        statusCode,
        data,
        message = 'SUCCESS'
    ) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
};

const buildApiResponse = (res) => {
    return new ApiResponse(
        responseCodes[res.resType],
        res.data,
        res.resMsg + ' - ' + responseMessage[res.resType]
    );
}

export {
    ApiResponse,
    buildApiResponse
};
