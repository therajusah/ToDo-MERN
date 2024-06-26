import PropTypes from "prop-types";
import "./todo.css";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, id, delid, display, updateId, toBeUpdate }) => {
  return (
    <div className="p-3 todo-card">
      <div>
        <h5 className="fw-bold todo-title">{title}</h5>
        <p className="todo-card-desc">{body}</p>
      </div>
      <div className="d-flex justify-content-around">
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
          onClick={() => {
            display("block");
            toBeUpdate(updateId); 
          }}
        >
          <GrDocumentUpdate className="card-icons" /> Update
        </div>
        <div
          className="d-flex justify-content-around align-items-center card-icon-head px-2 py-1 text-danger"
          onClick={() => {
            delid(id);
          }}
        >
          <MdDelete className="card-icons del" /> Delete
        </div>
      </div>
    </div>
  );
};

TodoCards.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  delid: PropTypes.func.isRequired,
  display: PropTypes.func.isRequired,
  toBeUpdate: PropTypes.func.isRequired, 
  updateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default TodoCards;
