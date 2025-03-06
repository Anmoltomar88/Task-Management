import express from 'express';
import { Create, Read, Update , Delete,mark_done ,ReadSingleTask,mark_undone} from './listInfo.js';
const listRouter=express.Router();

//create update delete read markdone markundone status
listRouter.post("/addTask",Create);
listRouter.get("/getTask/:id",Read);
listRouter.put("/updateTask/:id",Update);
listRouter.put("/mark-done/:id",mark_done);
listRouter.get("/task/:id", ReadSingleTask);
listRouter.put("/unmark-done/:id",mark_undone);
listRouter.delete("/deleteTask/:idList",Delete);

export default listRouter;