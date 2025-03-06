import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";

const TaskCards = ({ title, body, idList,deleted, display, updateId ,tobeUpdate}) => {

  const handleDelete = (idList) => {
    deleted(idList);
  };

  const HandleUpdate =()=>{
    display("block");
    tobeUpdate(updateId,idList);
  }

  return (
    <div className="p-3 tasks-card">
      <div>
        <h5 style={{ textAlign: "center" }}>{title}</h5>
        <p className="tasks-card-p">{body}</p>
      </div>
      <div className="d-flex justify-content-around">
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 "
          onClick={HandleUpdate}
        >
          <GrDocumentUpdate className="card-icons " />
          Update
        </div>
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
          onClick={() => handleDelete(idList)}
        >
          <AiFillDelete className="card-icons del " />
          Delete
        </div>
      </div>
    </div>
  );
};

export default TaskCards;
