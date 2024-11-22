import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    name: {
        type: String,
        unique: true,
        required: true
    },

    header: {
        type: String,
        required: true
    },

    message: {
        type: String,
        default: null,
    },

    square: {
        type: Boolean,
        required: true
    },

    image: {
        type: String,
        required: false
    },

    deletedAt: {
        type: Date,
        expires: "1m",
        default: null
    }

}, { timestamps: true });

export const Product = mongoose.models.products || mongoose.model('products', ProductSchema)