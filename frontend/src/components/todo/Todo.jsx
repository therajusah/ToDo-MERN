import { useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";

const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  const submit = () => {
    setArray([...Array, Inputs]);
    setInputs({ title: "", body: "" });
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
        <div className="todo-body">
          <div className="container-fluid d-flex">
            <div className="row">
              {Array &&
                Array.map((item, index) => (
                  <div className="col-lg-3 mx-4 my-2 col-10 row-10 todo-text-box" key={index}>
                  <TodoCards key={index} title={item.title} body={item.body} />
                </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;