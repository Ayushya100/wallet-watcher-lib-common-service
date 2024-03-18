'use strict';

import { registerLog } from '../db/dbQueries.js';

let currentUserContext = {};

const getCurrentDateTime = () => {
    let dateNow = new Date();
    dateNow.setDate(dateNow.getDate());

    let date = ('0' + dateNow.getDate()).slice(-2);
    let month = ('0' + (dateNow.getMonth() + 1)).slice(-2);
    let year = dateNow.getFullYear();
    let hour = ('0' + dateNow.getHours()).slice(-2);
    let minutes = ('0' + dateNow.getMinutes()).slice(-2);
    let seconds = ('0' + dateNow.getSeconds()).slice(-2);
    let milliSeconds = ('0' + dateNow.getMilliseconds()).slice(-3);

    let todayDate = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds + ':' + milliSeconds;
    return todayDate;
}

const buildPayload = (source, msg, level, additionalInfo) => {
    const logPayload = {
        userId: currentUserContext.userId,
        message: msg,
        level: level,
        timeStamp: getCurrentDateTime(),
        source: source || 'route',
        requestData: {
            method: currentUserContext.method,
            url: currentUserContext.url,
            headers: currentUserContext.headers,
            body: currentUserContext.body
        },
        additionalInfo: additionalInfo
    }

    return logPayload;
}

const buildCustomPayload = (source, userId, msg, level, additionalInfo, headers, body) => {
    const logPayload = {
        userId: userId || currentUserContext.userId,
        message: msg,
        level: level,
        timeStamp: getCurrentDateTime(),
        source: source || 'route',
        requestData: {
            method: currentUserContext.method,
            url: currentUserContext.url,
            headers: headers,
            body: body
        },
        additionalInfo: additionalInfo
    }

    return logPayload;
}

const createNewLog = (source) => {
    return {
        createInfoLog: async(msg = '', additionalInfo = '') => {
            const buildLogPayload = buildPayload(source, msg, 'info', additionalInfo);
            await registerLog(buildLogPayload);
        },
        createErrorLog: async(msg = '', additionalInfo = '') => {
            const buildLogPayload = buildPayload(source, msg, 'error', additionalInfo);
            await registerLog(buildLogPayload);
        },
        createCustomLog: async(msg = '', level, additionalInfo = '') => {
            const buildLogPayload = buildCustomPayload(source, userId, msg, level, additionalInfo, headers = {}, body = {});
            await registerLog(buildLogPayload);
        }
    }
}

export {
    currentUserContext,
    createNewLog
};