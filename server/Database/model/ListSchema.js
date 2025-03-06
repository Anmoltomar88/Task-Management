import mongoose from "mongoose";

const listSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    user: [{
        type: mongoose.Types.ObjectId,
        ref: "UserInfo"
    }]
}, {
    timestamps: true
});

const List = mongoose.model("List", listSchema);

export default List;
