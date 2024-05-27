import { useEffect, useState } from 'react';
import './todo.css';
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from 'axios';

const Todo = () => {
  const [inputs, setInputs] = useState({ title: '', body: '' });
  const [tasks, setTasks] = useState([]);
  const [toUpdateTask, setToUpdateTask] = useState(null);

  const id = sessionStorage.getItem('id');

  const showTextarea = () => {
    document.getElementById('textarea').style.display = 'block';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleAddTask = async () => {
    if (!inputs.title || !inputs.body) {
      toast.error('Title or Body should not be empty');
      return;
    }

    if (id) {
      try {
        const response = await axios.post('http://localhost:1000/api/v2/addTask', {
          title: inputs.title,
          body: inputs.body,
          id: id,
        });

        setInputs({ title: '', body: '' });
        setTasks((prevTasks) => [...prevTasks, response.data.list]);
        toast.success('Your Task is Added');
      } catch (error) {
        console.error('Error adding task:', error);
        toast.error('Failed to add task. Please try again.');
      }
    } else {
      toast.error('Your Task is Not Saved! Please Sign Up');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:1000/api/v2/deleteTask/${taskId}`, {
        data: { id: id },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task. Please SignUp First');
    }
  };

  const handleDisplayUpdate = (value) => {
    document.getElementById('todo-update').style.display = value;
  };

  const handleUpdateTask = (index) => {
    setToUpdateTask(tasks[index]);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v2/getTasks/${id}`);
        setTasks(response.data.list);
      } catch (error) {
        console.error('Error fetching tasks:', error);
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
              onClick={showTextarea}
              value={inputs.title}
              name="title"
              onChange={handleChange}
            />
            <textarea
              placeholder="Body"
              name="body"
              className="p-2 my-2 todo-inputs"
              rows="2"
              id="textarea"
              value={inputs.body}
              onChange={handleChange}
            />
            <button className="btn btn-primary mt-2" onClick={handleAddTask}>
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
                      key={item._id}
                    >
                      <TodoCards
                        title={item.title}
                        body={item.body}
                        id={item._id}
                        delid={handleDeleteTask}
                        display={handleDisplayUpdate}
                        updateId={index}
                        toBeUpdate={handleUpdateTask}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id="todo-update" style={{ display: 'none' }}>
        {toUpdateTask && (
          <Update display={handleDisplayUpdate} update={toUpdateTask} />
        )}
        <div className="container update"></div>
      </div>
    </>
  );
};

export default Todo;
