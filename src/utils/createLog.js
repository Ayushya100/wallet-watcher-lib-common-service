'use strict';

import { registerLog } from '../db/dbQueries.js';
import { responseCodes, responseMessage } from '../assets/response/response-codes.js';

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

const buildResponse = (response) => {
    if (response) {
        return {
            statusCode: responseCodes[response.resType],
            statusMsg: response.resMsg + ' - ' + responseMessage[response.resType],
            response: response.data
        };
    }

    return null;
}

const buildPayload = (source, msg, level, response, additionalInfo) => {
    let logPayload = {
        logSessionId: currentUserContext.logSessionId,
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
        responseData: buildResponse(response),
        additionalInfo: additionalInfo
    }

    return logPayload;
}

const buildCustomPayload = (source, userId, msg, level, response, additionalInfo, headers, body) => {
    let logPayload = {
        logSessionId: currentUserContext.logSessionId,
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
        responseData: buildResponse(response),
        additionalInfo: additionalInfo
    }

    return logPayload;
}

const createNewLog = (source) => {
    return {
        createInfoLog: async(msg = '', response = null, additionalInfo = '') => {
            const buildLogPayload = buildPayload(source, msg, 'info', response, additionalInfo);
            await registerLog(buildLogPayload);
        },
        createDebugLog: async(msg = '', response = null, additionalInfo = '') => {
            const buildLogPayload = buildPayload(source, msg, 'debug', response, additionalInfo);
            await registerLog(buildLogPayload);
        },
        createWarnLog: async(msg = '', response = null, additionalInfo = '') => {
            const buildLogPayload = buildPayload(source, msg, 'warn', response, additionalInfo);
            await registerLog(buildLogPayload);
        },
        createErrorLog: async(msg = '', response = null, additionalInfo = '') => {
            const buildLogPayload = buildPayload(source, msg, 'error', response, additionalInfo);
            await registerLog(buildLogPayload);
        },
        createCustomLog: async(userId = null, msg = '', level, response = null, additionalInfo = '') => {
            const buildLogPayload = buildCustomPayload(source, userId, msg, level, response, additionalInfo, headers = {}, body = {});
            await registerLog(buildLogPayload);
        }
    }
}

export {
    currentUserContext,
    createNewLog
};