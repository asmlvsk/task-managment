import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    nickname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String},
    regDate: {type: Date, default: Date.now()}
});

export default mongoose.model("User", userSchema);