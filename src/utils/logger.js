'use strict';

import winston from 'winston';

const buildTransporter = () => {
    return [
        new winston.transports.Console()
    ];
}

const buildFormat = (label) => {
    return winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true }),
        winston.format.label({ label: label }),
        winston.format.printf(info => {
            return `${info.timestamp} - ${info.level} [${info.label}]: ${info.message}`;
        })
    );
}

const logger = (label = '') => {
    const format = buildFormat(label);
    const transport = buildTransporter();

    return winston.createLogger({
        level: 'info',
        format: format,
        transports: transport
    });
}

export default logger;
