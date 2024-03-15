'use strict';

import winston from 'winston';
import { combine, timestamp, prettyPrint, colorize, label } from winston.format;

const buildTransporter = () => {
    return winston.transports.Console({
        format: winston.format.simple()
    });
}

const buildFormat = (msg) => {
    return combine(
        timestamp(),
        prettyPrint(),
        colorize({ all: true }),
        label({ label: msg })
    );
}

const logger = (msg = '') => {
    const format = buildFormat(msg);
    const transport = buildTransporter();

    return winston.createLogger({
        level: 'debug',
        format: format,
        transports: transport
    });
}

export default logger;
