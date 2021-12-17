import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    nickname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String},
    regDate: {type: Date, default: Date.now()},
    emailToken: {type: String},
    confirmed: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("User", userSchema);