'use strict';

import { v4 as uuidv4 } from 'uuid';
import { currentUserContext } from '../utils/index.js';

const registerUser = (req, res, next) => {
    currentUserContext.method = req.method;
    currentUserContext.url = req.originalUrl;
    currentUserContext.userId = req.params?.userId;
    currentUserContext.headers = req.params;
    currentUserContext.body = {...req.body};
    currentUserContext.logSessionId = 'LSI' + uuidv4();

    if (currentUserContext.body.password) {
        delete currentUserContext.body.password;
    }
    
    if (currentUserContext.body.oldPassword) {
        delete currentUserContext.body.oldPassword;
    }

    if (currentUserContext.body.newPassword) {
        delete currentUserContext.body.newPassword;
    }

    next();
}

export default registerUser;
