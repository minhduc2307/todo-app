import { useState } from "react";
import PropTypes from "prop-types";
import "../css/Sidebar.css";
import "../css/responsive.css";
import { CATEGORY_ITEMS } from "../constants";
import { useAppContext } from "../context/AppProvider";

const Sidebar = (props) => {
    const { handleTodoItemChange, showSidebar, setShowSidebar } = useAppContext();
    const data = props.todoItem;
    const [name, setName] = useState(data.name);
    const [isImportant, setIsImportant] = useState(data.isImportant);
    const [isCompleted, setIsCompleted] = useState(data.isCompleted);
    const [category, setCategory] = useState(data.category);

    const handleSave = () => {
        const newTodo = { ...data, name, isImportant, isCompleted, category };
        handleTodoItemChange(newTodo);
        setShowSidebar(false);
    };

    return (
        <div className={`sidebar ${showSidebar ? "sidebar--active" : ""}`}>
            <form className="sidebar-form">
                <div className="sb-form-field">
                    <label htmlFor="sb-name" className="sidebar-form__label">
                        Todo Name
                    </label>
                    <input
                        type="text"
                        id="sb-name"
                        name="name"
                        className="sidebar-form__input"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="sidebar-form__group">
                    <label htmlFor="sb-important">Is important?</label>
                    <input
                        type="checkbox"
                        id="sb-important"
                        name="isImportant"
                        checked={isImportant}
                        onChange={() => setIsImportant(!isImportant)}
                    />
                </div>
                <div className="sidebar-form__group">
                    <label htmlFor="sb-completed">Is completed?</label>
                    <input
                        type="checkbox"
                        id="sb-completed"
                        name="isCompleted"
                        checked={isCompleted}
                        onChange={() => setIsCompleted(!isCompleted)}
                    />
                </div>
                <div className="sidebar-form__group sidebar-form__group--big">
                    <label htmlFor="sb-completed">Category</label>
                    <div className="custom-select">
                        <select
                            name=""
                            id="sb-category"
                            className="select"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                        >
                            {CATEGORY_ITEMS.map((category) => {
                                return (
                                    <option value={category.id} key={category.id}>
                                        {category.label}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </form>
            <div className="sidebar-controls-group">
                <button className="sidebar-btn save-btn" onClick={handleSave}>
                    Save
                </button>
                <button
                    className="sidebar-btn cancel-btn"
                    onClick={() => {
                        setShowSidebar(false);
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    setShowSidebar: PropTypes.func,
    todoItem: PropTypes.shape({
        name: PropTypes.string,
        isImportant: PropTypes.bool,
        isCompleted: PropTypes.bool,
        category: PropTypes.string,
    }),
    handleTodoItemChange: PropTypes.func,
};
export default Sidebar;
