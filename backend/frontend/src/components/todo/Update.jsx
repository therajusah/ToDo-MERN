import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const Update = ({ display, update }) => {
  const [inputs, setInputs] = useState({
    title: '',
    body: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (update) {
      setInputs({
        title: update.title || '',
        body: update.body || '',
      });
    }
  }, [update]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async () => {
    if (!inputs.title || !inputs.body) {
      alert('Title or Body should not be empty');
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${window.location.origin}/api/v2/updateTask/${update._id}`, inputs);
      toast.success('Task Updated Successfully');
      display('none');
      // Todo
      window.location.reload();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h3>Update Your Task</h3>
      <input
        type="text"
        className="todo-inputs my-4 w-100 p-3"
        value={inputs.title}
        name="title"
        onChange={handleChange}
      />
      <textarea
        className="todo-inputs w-100 p-3"
        value={inputs.body}
        name="body"
        onChange={handleChange}
      />
      <div>
        <button
          className="btn btn-dark my-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button
          className="btn btn-danger my-4 mx-4"
          onClick={() => display('none')}
        >
          Close
        </button>
      </div>
    </div>
  );
};

Update.propTypes = {
  display: PropTypes.func.isRequired,
  update: PropTypes.object.isRequired,
};

export default Update;
