'use strict';

import mongoose from 'mongoose';

// Card Info Schema
const cardInfoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        token: {
            type: String,
            unique: true,
            required: true
        },
        cardNumber: {
            type: String,
            required: true,
            unique: true
        },
        cardType: {
            type: String,
            required: true
        },
        bankInfo: {
            type: String,
            required: true
        },
        expirationDate: {
            type: String,
            required: true
        },
        holderName: {
            type: String,
            required: true
        },
        cardColor: {
            type: String,
            required: false,
            default: '#ffffff'
        },
        balance: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        },
        createdOn: {
            type: Date,
            required: true,
            default: Date.now()
        },
        createdBy: {
            type: String,
            default: 'SYSTEM',
            required: false,
            trim: true
        },
        modifiedOn: {
            type: Date,
            required: true,
            default: Date.now()
        },
        modifiedBy: {
            type: String,
            default: 'SYSTEM',
            required: false,
            trim: true
        },
        isDeleted: {
            type: Boolean,
            required: true,
            default: false
        }
    }
);

// Card Info Model
const CardInfoModel = mongoose.model('CardInfo', cardInfoSchema);

export default CardInfoModel;
