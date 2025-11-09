
const mongoose = require( 'mongoose' )
const { Schema } = mongoose

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [ /^\S+@\S+\.\S+$/, "Invalid email format" ],
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
    },
    { timestamps: true }
);

const User = mongoose.model( "User", userSchema );

module.exports = User;