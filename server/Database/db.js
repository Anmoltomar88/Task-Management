import mongoose from "mongoose";

const Connection = async ({username,password}) => {
    const url = process.env.MongoDB_URI;
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default Connection;