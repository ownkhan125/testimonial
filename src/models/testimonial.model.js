import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },

    email: {
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