import mongoose from "mongoose";
// import List from "./ListSchema.js";
const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    list: [{
        type: mongoose.Types.ObjectId,
        ref: 'List'
    }]
}, {
    timestamps: true
});

const UserInfo = mongoose.model("UserInfo", userSchema);

export default UserInfo;
 