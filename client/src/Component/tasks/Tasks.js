import React, { useState, useEffect } from "react";
import "./Tasks.css";
import TaskCards from "./TaskCards";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

const Tasks = () => {
  const id_User = sessionStorage.getItem("id");
  // console.log(id_User); //user id for creating list if only user exist

  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [showTextarea, setShowTextarea] = useState(false);
  const [TaskArray, setTaskArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTextarea = () => {
    setShowTextarea(!showTextarea);
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({...prevInputs,[name]: value}));
  };

  const submit = async () => {
    if (Inputs.title.trim() === "") {
      toast.error("Enter the Title please");
    } else if (Inputs.body.trim() === "") {
      toast.error("Enter the Body please");
    } else {
      if (id_User) {
        /*if user exist*/ 
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/addTask`,
          {
            title: Inputs.title,
            body: Inputs.body,
            id: id_User, //user id
          }
        );
        setTaskArray([...TaskArray, Inputs]);
        toast.success("Your task is added");
        setInputs({ title: "", body: "" });
      } else {
        setTaskArray([...TaskArray, Inputs]);
        toast.success("Your task is added");
        toast.error("Your Task is not saved !!! please SignUp");
        setInputs({ title: "", body: "" });
      }
    }
  };

  const fetch = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getTask/${id_User}`
    );
    setTaskArray(...TaskArray, response.data.list);
    // console.log(response.data.list);
    setIsLoading(false);
  };

  useEffect(() => {
    if (id_User) {
      fetch();
    }
  }, []);

  //delete task
  const HandleDeleteTask = async (idList) => {
    if (id_User) {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/deleteTask/${idList}`,
        { data: { id: id_User } }
      );
      if (response.status === 200) {
        setTaskArray(TaskArray.filter((task) => task._id !== idList));
        toast.success("Your task is deleted");
      } else {
        toast.error("Failed to delete task.");
      }
    } else {
      setTaskArray(prevTasks => prevTasks.filter(task => task._id !== idList));
      toast.success("Task deleted");
    }
  };

  //Show update Dialog
  const showUpdate = (style) => {
    document.getElementById("task-update").style.display = style;
  };

  //Update Task Id
  const [UpdateTaskArray_ID, setUpdateTaskArray_ID] = useState([]);
  const HandleUpdateData = async (updateId) => {
    setUpdateTaskArray_ID(TaskArray[updateId]);
    
  };

  //Update karu ga abb yaha per
  const HandleUpdate = async (UpdateTask, ID) => {
    if (id_User) {
      try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/updateTask/${ID}`, { ...UpdateTask, id_User });
        if (response.status === 200) {
          toast.success("Your Task is Updated");
          setTaskArray(prevTasks =>
            prevTasks.map(task => (task._id === ID ? { ...task, ...UpdateTask } : task))
          );
        }
      } catch (error) {
        console.error(error);
        toast.error("Problem Updating The Task");
      }
    } else {
      setTaskArray(prevTasks =>
        prevTasks.map(task => (task._id === ID ? { ...task, ...UpdateTask } : task))
      );
      toast.success("Task Updated Locally");
    }
  };
  

  return (
    <div className="tasks my-5">
      <div className="container tasks-main d-flex align-items-center flex-column">
        <div className="d-flex flex-column tasks-input-div w-50 p-2 my-2">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Right The Title..."
            className="tasks-input p-2 my-2"
            onClick={toggleTextarea}
            onChange={HandleChange}
            value={Inputs.title}
          />
          {showTextarea && (
            <textarea
              type="text"
              name="body"
              id="body"
              placeholder="Right the content...."
              className="tasks-input p-2"
              onChange={HandleChange}
              value={Inputs.body}
            />
          )}
        </div>
        <div className="d-flex flex-column w-50 align-items-end ">
          <button className="home-btn" onClick={submit}>
            Add
          </button>
        </div>
      </div>
      {isLoading ? (
        <p>Loading Please wait......</p>
      ) : (
        <div className="tasks-body">
          <div className="container-fluid">
            <div className="row">
              {TaskArray.map((task, index) => (
                <div className="col-lg-3 col-11 mx-lg-5 mx-2 my-2" key={index}>
                  <TaskCards
                    title={task.title}
                    body={task.body}
                    idList={task._id}
                    deleted={HandleDeleteTask}
                    display={showUpdate}
                    updateId={index}
                    tobeUpdate={HandleUpdateData}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="task-update bg-success" id="task-update">
        <div className="container">
          <Update display={showUpdate} update={UpdateTaskArray_ID} onUpdate={HandleUpdate}/>
        </div>
      </div>
    </div>
  );
};

export default Tasks;