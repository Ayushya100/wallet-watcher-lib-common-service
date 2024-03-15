'use strict';

import jwt from 'jsonwebtoken';

const verifyToken = (tokenKey) => (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

        if (!accessToken) {
            return next({
                resType: 'BAD_REQUEST',
                resMsg: 'TOKEN NOT FOUND',
                isValid: false
            });
        }

        const decodedToken = jwt.verify(accessToken, tokenKey);
        if ((req.params.userId) && (req.params.userId !== decodedToken._id)) {
            return next({
                resType: 'UNAUTHORIZED',
                resMsg: 'UNAUTHORIZED ACCESS - USER MISMATCHED',
                isValid: false
            });
        }

        req.user = {
            userId: decodedToken._id
        };
        next();
    } catch (err) {
        next({

        });
    }
};

export default verifyToken;
