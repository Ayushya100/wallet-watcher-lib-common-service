'use strict';

import mongoose from 'mongoose';

// Logs Schema
const logSchema = new mongoose.Schema(
    {
        logSessionId: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
        message: {
            type: String,
            required: true
        },
        level: {
            type: String,
            enum: ['info', 'debug', 'warn', 'error'],
            required: true
        },
        timeStamp: {
            type: Date,
            default: Date.now()
        },
        source: {
            type: String,
            required: true
        },
        requestData: {
            method: String,
            url: String,
            headers: Object,
            body: Object
        },
        additionalInfo: {
            type: mongoose.Schema.Types.Mixed
        }
    }
);

// Logs Model
const LogsModel = mongoose.model('Logs', logSchema);

export default LogsModel;
