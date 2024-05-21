import { useState } from "react";
import "./todo.css";

const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = () => {
    console.log(Inputs);
  };

  return (
    <div className="todo">
      <div className="todo-main container d-flex flex-column align-items-center my-4">
        <div className="d-flex flex-column todo-inputs-div w-50 p-4 shadow-lg rounded p-1">
          <input
            type="text"
            placeholder="Title"
            className="my-2 p-2 todo-inputs"
            onClick={show}
            value={Inputs.title}
            name="title"
            onChange={change}
          />
          <textarea
            type="text"
            placeholder="Body"
            name="body"
            className="p-2 my-2 todo-inputs"
            rows="2"
            id="textarea"
            value={Inputs.body}
            onChange={change}
          />
          <button className="btn btn-primary mt-2" onClick={submit}>
            Add Task
          </button>
        </div>
        {/* <div className="tasks-list w-50 mt-4">
          <div className="task p-3 mb-2 shadow-sm rounded">
            <h4>Sample Task Title 1</h4>
            <p>Sample Task Body 1</p>
          </div>
  */}
      </div>
    </div>
  );
};

export default Todo;
