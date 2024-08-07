import { useEffect, useState } from "react";
import "./todo.css";
import TodoCards from "./TodoCards";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./Update";
import axios from "axios";

const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [tasks, setTasks] = useState([]);
  const id = sessionStorage.getItem("id");

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
const submit = async () => {
  if (id) {
    try {
      const response = await axios.post(`${window.location.origin}/api/v2/addTask`, {
        title: Inputs.title,
        body: Inputs.body,
        id: id,
      });

      console.log(response);

      setInputs({ title: "", body: "" });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      toast.success("Your Task is Added");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task. Please try again.");
    }
  } else {
    toast.error("Your Task is Not Saved! Please Sign Up");
  }
};

  const del = async (Cardid) => {
    try {
      const response = await axios.delete(
        `${window.location.origin}/api/v2/deleteTask/${Cardid}`,
        {
          data: { id: id },
        }
      );

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== Cardid));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/v2/getTasks/${id}`);
        setTasks(response.data.list);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    if (id) {
      fetchTasks();
    }
  }, [id]);

  return (
    <>
      <div className="todo">
        <ToastContainer />
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
                {tasks &&
                  tasks.map((item, index) => (
                    <div
                      className="col-lg-3 mx-4 my-2 col-10 row-10 todo-text-box"
                      key={index}
                    >
                      <TodoCards
                        title={item.title}
                        body={item.body}
                        id={item._id}
                        delid={del}
                        display={dis}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update">
        <Update display={dis} />
        <div className="container update"></div>
      </div>
    </>
  );
};

export default Todo;
