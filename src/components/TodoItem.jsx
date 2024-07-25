import PropTypes from "prop-types";
import { useAppContext } from "../context/AppProvider";
import "../css/TodoItem.css";

const TodoItem = (props) => {
    const {
        handleTodoItemClick,
        handleCompleteCheckboxChange,
        setShowModal,
        setDeletedTodoId,
        selectedFilterId,
        textDecoration,
        setTextDecoration,
    } = useAppContext();
    let isShow = true;
    if (selectedFilterId === "deleted") {
        isShow = false;
        setTextDecoration(true);
    }
    return (
        <li
            className={`todo-item ${textDecoration ? "todo-item--deleted" : ""}`}
            onClick={() => handleTodoItemClick(props.id)}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={props.isCompleted}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onChange={() => {
                        handleCompleteCheckboxChange(props.id);
                    }}
                />
                <p className="todo-item__name">{props.name}</p>
                {props.isImportant && <span>⭐</span>}
            </div>
            {isShow && (
                <button
                    className="todo-item__delete-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setDeletedTodoId(props.id);
                        setShowModal(true);
                    }}
                >
                    <img src="./trash.svg" alt="" />
                    Delete
                </button>
            )}
        </li>
    );
};

TodoItem.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    isImportant: PropTypes.bool,
    isCompleted: PropTypes.bool,
    handleTodoItemClick: PropTypes.func,
    handleCompleteCheckboxChange: PropTypes.func,
};
export default TodoItem;
