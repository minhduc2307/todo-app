import PropTypes from "prop-types";
import { useAppContext } from "../context/AppProvider";
import "../css/TodoItem.css";

const TodoItem = (props) => {
    const { handleTodoItemClick, handleCompleteCheckboxChange, setShowModal, setDeletedTodoId, selectedFilterId } =
        useAppContext();

    let isShow = true;
    let hasTextDecoration = false;

    if (selectedFilterId === "deleted") {
        isShow = false;
        hasTextDecoration = true;
    }

    return (
        <li
            className={`todo-item ${hasTextDecoration ? "todo-item--deleted" : ""}`}
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
                    <img src="https://minhduc2307.github.io/todo-app/trash.svg" alt="" />
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
