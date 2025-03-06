import mongoose from "mongoose";

const Connection = async ({username,password}) => {
    const url = `mongodb+srv://${username}:${password}@cluster0.7w85rui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default Connection;