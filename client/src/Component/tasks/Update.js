import React, { useState, useEffect } from "react";

const Update = ({ display, update, onUpdate }) => {
  const [UpdateTask, setUpdateTask] = useState({
    title: "",
    body: ""
  });

  useEffect(() => {
    setUpdateTask({
      title: update.title || "",
      body: update.body || ""
    });
  }, [update]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (UpdateTask.title.trim() && UpdateTask.body.trim()) {
      onUpdate(UpdateTask,update._id);
      display("none");
    } else {
      alert("Please fill in both fields before updating.");
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column">
      <h3>Update Your Task</h3>
      <input
        type="text"
        name="title"
        id="title"
        className="task-inputs my-4 w-100 p-4"
        placeholder="Update The Title"
        value={UpdateTask.title}
        onChange={handleChange}
      />
      <textarea
        name="body"
        id="body"
        className="task-inputs w-100 p-3"
        placeholder="Update the Content"
        value={UpdateTask.body}
        onChange={handleChange}
      />
      <div>
        <button className="btn btn-dark my-4" onClick={handleUpdate}>
          UPDATE
        </button>
        <button
          className="btn btn-danger my-4 mx-3"
          onClick={() => display("none")}
        >
          CLOSE
        </button>
      </div>
    </div>
  );
};

export default Update;
