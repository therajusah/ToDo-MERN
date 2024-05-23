import PropTypes from 'prop-types';

const Update = ({ display }) => {
  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
      <h3>Update Your Task</h3>
      <input type="text" className="todo-inputs my-4 w-100 p-3" />
      <textarea className="todo-inputs w-100 p-3 " />
      <div>
        <button className="btn btn-dark my-4">Update</button>
        <button
          className="btn btn-danger my-4 mx-4"
          onClick={() => display("none")}
        >
          Close
        </button>
      </div>
    </div>
  );
};

Update.propTypes = {
  display: PropTypes.func.isRequired,
};

export default Update;
