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
        if(list.lenght!=0){
            res.status(200).json({list})
        }else{
            res.status(200).json({message : "no Task"})
        }
    } catch (error) {
        console.log(error);
    }
};

// const Update = async (req, res) => {
//     try {
//         const { title , body } = req.body;
//         const existingUser = await UserInfo.findById(id_User);
//         if (existingUser) {
//             const { id }=req.params;
//             const list = await List.findByIdAndUpdate(id,{ title,body});
//             await list.save().then(() => res.status(200).json({ list  }));
//         }else{
//           res.status(400).json({message:"no user"});
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };
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

export {Create,Read,Update,Delete};