import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Connection from "./Database/db.js";
import userRouter from "./Routes/userRouter.js";
import listRouter from "./Routes/listRoutes.js";

const app = express();

dotenv.config();
const port = process.env.PORT || 8080;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", userRouter);
app.use("/", listRouter);

Connection({ username, password });

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
