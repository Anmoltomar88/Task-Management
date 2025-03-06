import List from "../Database/model/ListSchema.js";
import UserInfo from "../Database/model/userSchema.js";

const Create = async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await UserInfo.findById(id);
        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save()
            .then(() => res.status(200).json({ list }));
            existingUser.list.push(list);
            await existingUser.save();
        }
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

const Read = async (req, res) => {
    try {
        const {id}= req.params;
        const list = await List.find({ user : id }).sort({createdAt :-1});
        if(list.length!=0){
            res.status(200).json({list})
        }else{
            res.status(200).json({message : "no Task"})
        }
    } catch (error) {
        console.log(error);
    }
};


const Update =async(req,res)=>{
  try {
    const {title,body,id_User} =req.body;
    const {id}=req.params;
    const existingUser= await UserInfo.findById(id_User);
    if(existingUser){
      const list =await List.findByIdAndUpdate(id,{title,body});
      await list.save();
      res.status(200).json({list})
    }
  } catch (error) {
    res.status(400).json({message : error})
  }
}

const Delete = async (req, res) => {
    try {
      const { idList} = req.params;  // id ----> must be same provided as :id in route
      const  {id} = req.body;
  
      const existingUser = await UserInfo.findByIdAndUpdate(id, { $pull: { list: idList } });
  
      if (existingUser) {

        const deletedList = await List.findByIdAndDelete(idList);
        if (deletedList) {
          res.status(200).json({ message: "Task deleted" });
        } else {
          res.status(404).json({ message: "Task not found" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  //mark as done yaha pe
  const mark_done = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await List.findByIdAndUpdate(id, { status: true },{ new: true });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ message: "Task marked as done", task });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

const ReadSingleTask = async (req, res) => {
  try {
      const { id } = req.params;
      const task = await List.findById(id);
      
      if (!task) {
          return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json(task);
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }
};

const mark_undone = async (req, res) => {
  try {
      const task = await List.findByIdAndUpdate(req.params.id, { status: false });
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.status(200).json({ message: "Task unmarked as done", task });
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }
};


export {Create,Read,Update,Delete,mark_done,ReadSingleTask,mark_undone};