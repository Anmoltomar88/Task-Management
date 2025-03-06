import express from 'express';
import { Create, Read, Update , Delete } from './listInfo.js';
const listRouter=express.Router();

//create update delete read
listRouter.post("/addTask",Create);
listRouter.get("/getTask/:id",Read);
listRouter.put("/updateTask/:id",Update);
listRouter.delete("/deleteTask/:idList",Delete);

export default listRouter;