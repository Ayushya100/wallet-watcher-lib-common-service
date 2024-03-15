'use strict';

const UserDashboardModel = (mongoose) => {
    // User dashboard Schema
    const userDashboardSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            settingId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DashboardSettings'
            },
            type: {
                type: String,
                required: true,
                default: 'Boolean'
            },
            value: {
                type: String,
                required: true
            },
            createdOn: {
                type: Date,
                required: true,
                default: Date.now()
            },
            createdBy: {
                type: String,
                required: false,
                trim: true,
                default: 'SYSTEM'
            },
            modifiedOn: {
                type: Date,
                required: true,
                default: Date.now()
            },
            modifiedBy: {
                type: String,
                required: true,
                trim: true,
                default: 'SYSTEM'
            },
            isDeleted: {
                type: Boolean,
                default: false,
                required: false
            }
        }
    );
    
    // User dashboard Model
    const UserDashboard = mongoose.model('UserDashboard', userDashboardSchema);
    return UserDashboard;
}

export default UserDashboardModel;
