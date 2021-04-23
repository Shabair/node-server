import mongoose from 'mongoose'

const authSchema = mongoose.Schema(
    {

        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            maxlength: 50

        },
        phone: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 25,
            unique: true
        },
        work: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        password: {
            type: String,
            required: true
        }

    }, { timestamps: true }
);


const authModel = mongoose.model('user', authSchema);

export default authModel;