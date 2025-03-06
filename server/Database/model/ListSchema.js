import mongoose from "mongoose";
// import UserInfo from "./userSchema.js";

const listSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user:[{
        type:mongoose.Types.ObjectId,
        ref:"UserInfo"
    }]
}, {
    timestamps: true
});

const List =mongoose.model("List",listSchema);

export default List;
