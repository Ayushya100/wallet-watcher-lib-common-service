'use strict';

import { buildApiError } from '../utils/index.js';
import { responseCodes } from '../assets/response/response-codes.js';
import { createNewLog } from '../utils/index.js';

const registerLog = createNewLog('error-handler');

const errorHandler = (err, req, res, next) => {
    registerLog.createErrorLog(responseCodes[err.resType] + ' - ' + err.resMsg);
    res.status(responseCodes[err.resType]).json(
        buildApiError(err)
    );
}

export default errorHandler;
