'use strict';

import { v4 as uuidv4 } from 'uuid';
import { currentUserContext } from '../utils/index.js';

const registerUser = (req, res, next) => {
    currentUserContext.method = req.method;
    currentUserContext.url = req.originalUrl;
    currentUserContext.userId = req.params?.userId || req.body?.userId;
    currentUserContext.headers = req.params;
    currentUserContext.body = {...req.body};
    currentUserContext.logSessionId = 'LSI' + uuidv4();

    if (currentUserContext.body.password) {
        delete currentUserContext.body.password;
    }

    next();
}

export default registerUser;
