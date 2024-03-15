'use strict';

import { buildApiError } from '../utils/index.js';
import { responseCodes } from '../assets/response/response-codes.js';

const errorHandler = (err, req, res, next) => {
    res.status(responseCodes[err.resType]).json(
        buildApiError(err)
    );
}

export default errorHandler;
