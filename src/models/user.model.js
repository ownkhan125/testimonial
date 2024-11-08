import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    authProvider: {
        type: String,
        default: null
    },
  
});

export const User = mongoose.models.users || mongoose.model('users', UserSchema)