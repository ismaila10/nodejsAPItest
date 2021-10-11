const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter prénom'
    },
    lastName: {
        type: String,
        required: 'Enter nom'
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
)