import mongoose from 'mongoose'

const testimonialSchema = new mongoose.Schema({

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
        required: true,
    },

    image: {
        type: String,
        required: false,
        default: null
    },

    photo: {
        type: String,
        required: false,
        default: null
    },

    rating: {
        type: String,
        required: true
    },

    permission: {
        type: Boolean,
        required: true,
        default: false,
    },


    deletedAt: {
        type: Date,
        expires: "1m",
        default: null
    }

}, { timestamps: true });

export const Testimonial = mongoose.models.testimonials || mongoose.model('testimonials', testimonialSchema)