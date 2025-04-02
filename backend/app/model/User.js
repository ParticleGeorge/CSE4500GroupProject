import mongoose from "mongoose";

let userSchema = newmongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    passwordDigest: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('User', userSchema);

export default User;