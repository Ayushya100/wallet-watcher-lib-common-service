'use strict';

// Add DB Model
import { LogsModel } from '../models/index.js';

const registerLog = async(logPayload) => {
    await LogsModel.create(logPayload);
}

export {
    registerLog
};
