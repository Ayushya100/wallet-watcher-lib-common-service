'use strict';

import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

import { responseCodes, responseMessage } from './src/assets/response/response-codes.js';
import {
    ApiError,
    ApiResponse,
    buildApiError,
    buildApiResponse,
    logger,
    createNewLog
} from './src/utils/index.js';
import {
    UserModel,
    CardInfoModel,
    InvestmentAccInfoModel,
    UserWalletCategoryModel,
    CrdExpDetailsModel,
    DashboardSettingsModel,
    UserDashboardModel,
    ExpDetailsModel,
    UserFinanceModel,
    IncDetailsModel,
    InvDetailsModel,
    MetadataModel,
    LogsModel
} from './src/models/index.js';
import {
    verifyToken,
    errorHandler,
    userContext
} from './src/middlewares/index.js';
import dbConnection from './src/db/dbConnection.js';

export {
    ApiError,
    ApiResponse,
    responseCodes,
    responseMessage,
    buildApiError,
    buildApiResponse,
    logger,
    createNewLog,
    UserModel,
    CardInfoModel,
    InvestmentAccInfoModel,
    UserWalletCategoryModel,
    CrdExpDetailsModel,
    DashboardSettingsModel,
    UserDashboardModel,
    ExpDetailsModel,
    UserFinanceModel,
    IncDetailsModel,
    InvDetailsModel,
    MetadataModel,
    LogsModel,
    verifyToken,
    errorHandler,
    userContext,
    dbConnection
};