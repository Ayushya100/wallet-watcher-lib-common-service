'use strict';

import winston from 'winston';

const buildTransporter = () => {
    return [
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ];
}

const buildFormat = (msg) => {
    return winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true }),
        winston.format.label({ label: msg })
    );
}

const logger = (msg = '') => {
    const format = buildFormat(msg);
    const transport = buildTransporter();

    return winston.createLogger({
        level: 'info',
        format: format,
        transports: transport
    });
}

export default logger;
