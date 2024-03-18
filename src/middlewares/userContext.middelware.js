'use strict';

import { currentUserContext } from '../utils/index.js';

const userContext = (req, res, next) => {
    currentUserContext.method = req.method;
    currentUserContext.url = req.originalUrl;
    currentUserContext.userId = req.params?.userId || req.body?.userId;
    currentUserContext.headers = req.params;
    currentUserContext.body = req.body;
    next();
}

export default userContext;
