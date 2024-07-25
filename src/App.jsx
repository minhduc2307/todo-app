import { useMemo, useRef, useState } from "react";
import "./App.css";
import "./css/responsive.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import { useAppContext } from "./context/AppProvider";
import Modal from "./components/Modal";

function App() {
    const {
        selectedCategoryId,
        todoList,
        setTodoList,
        selectedFilterId,
        searchText,
        activeTodoItemId,
        showSidebar,
        showModal,
    } = useAppContext();

    const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

    const [value, setValue] = useState("");

    const inputRef = useRef(); //Thao tac Dom element

    const filteredTodos = useMemo(() => {
        return todoList.filter((todo) => {
            if (!todo.name.includes(searchText)) {
                return false;
            }

            if (selectedCategoryId && todo.category !== selectedCategoryId) {
                return false;
            }
            switch (selectedFilterId) {
                case "all":
                    if (!todo.isDeleted) {
                        return true;
                    }
                    break;
                case "important":
                    return todo.isImportant;
                case "completed":
                    return todo.isCompleted;
                case "deleted":
                    return todo.isDeleted;
                default:
                    return true;
            }
        });
    }, [todoList, selectedFilterId, searchText, selectedCategoryId]);

    const handleAddTodoItem = () => {
        let newValue = value.trim();
        setTodoList([
            ...todoList,
            {
                id: crypto.randomUUID(),
                name: newValue,
                isCompleted: false,
                isImportant: false,
                isDeleted: false,
                category: "personal",
            },
        ]);
        inputRef.current.value = "";
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddTodoItem();
        }
    };

    return (
        <div className="container">
            <FilterPanel />
            <div className="main-content">
                <h1 className="heading">TODO List</h1>
                <div className="add-todo-item-wrap">
                    <input
                        ref={inputRef}
                        type="text"
                        name="add-new-task"
                        placeholder="Add new task"
                        className="task-input"
                        onKeyDown={handleKeyDown}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                    />
                    <button className="add-todo-item-btn" onClick={handleAddTodoItem}>
                        Add
                    </button>
                </div>
                <ul className="todo-list-item">
                    {filteredTodos.map((todo) => {
                        return (
                            <TodoItem
                                id={todo.id}
                                name={todo.name}
                                key={todo.id}
                                isImportant={todo.isImportant}
                                isCompleted={todo.isCompleted}
                            />
                        );
                    })}
                </ul>
                {showSidebar && <Sidebar todoItem={activeTodoItem} key={activeTodoItemId} />}
            </div>
            {showModal && <Modal />}
        </div>
    );
}

export default App;
