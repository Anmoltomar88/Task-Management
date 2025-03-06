import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
import { FaCheckCircle, FaUndo } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const TaskCards = ({ title, body, idList, deleted, display, updateId, tobeUpdate }) => {
  const [markedDone, setMarkedDone] = useState(false);
  
  const HandleUpdate = () => {
    display("block");
    tobeUpdate(updateId, idList);
  };
  
  const handleDelete = (idList) => {
    deleted(idList);
  };

  const handleToggleDone = async () => {
    if (sessionStorage.getItem("id")) {
      try {
        const mark = markedDone//false hua to mark done nahi to unmark karna hai
          ? `${process.env.REACT_APP_BACKEND_URL}/unmark-done/${idList}` // Undo API
          : `${process.env.REACT_APP_BACKEND_URL}/mark-done/${idList}`; // Mark API

        const response = await axios.put(mark);
        if (response.status === 200) {
          toast.success(markedDone ? "Task undone!" : "Task marked as done!");
          setMarkedDone(!markedDone);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to update task.");
      }
    } else {
      toast.success(markedDone ? "Task undone locally!" : "Task marked as done locally!");
      setMarkedDone(!markedDone);
    }
  };

  //abb login kara to jisse status dekh sake to ak aur api
  useEffect(() => {
    const fetchTaskStatus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/task/${idList}`);
        setMarkedDone(response.data.status);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTaskStatus();
  }, [idList]);

  return (
    <div className={`p-3 tasks-card ${markedDone ? "task-done" : ""}`}>
      <div>
        <h5 style={{ textAlign: "center", textDecoration: markedDone ? "line-through" : "none" }}>
          {title}
        </h5>
        <p className="tasks-card-p">{body}</p>
      </div>
      <div className="d-flex justify-content-around">
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
          onClick={HandleUpdate}
        >
          <GrDocumentUpdate className="card-icons" />
          Update
        </div>

        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-success"
          onClick={handleToggleDone}
          style={{ cursor: "pointer" }}
        >
          {markedDone ? (
            <>
              <FaUndo className="card-icons" /> Undo
            </>
          ) : (
            <>
              <FaCheckCircle className="card-icons" /> Mark as Done
            </>
          )}
        </div>

        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
          onClick={() => handleDelete(idList)}
        >
          <AiFillDelete className="card-icons del" />
          Delete
        </div>
      </div>
    </div>
  );
};

export default TaskCards;
