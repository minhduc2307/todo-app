import { useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";

function App() {
    const [todoList, setTodoList] = useState([
        {
            id: "1",
            name: "Đi học thêm",
            isImportant: true,
            isCompleted: false,
            isDeleted: false,
        },
        {
            id: "2",
            name: "Đi tập gym",
            isImportant: false,
            isCompleted: true,
            isDeleted: false,
        },
        {
            id: "3",
            name: "Đọc sách",
            isImportant: true,
            isCompleted: true,
            isDeleted: false,
        },
    ]);

    const [activeTodoItemId, setActiveTodoItemId] = useState();

    const [showSidebar, setShowSidebar] = useState(false);

    const [selectedFilterId, setSelectedFilterId] = useState("all"); //Lifting State Up

    const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

    const handleCompleteCheckboxChange = (todoId) => {
        const newTodoList = todoList.map((todo) => {
            if (todo.id === todoId) {
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        });
        setTodoList(newTodoList);
    };

    const handleTodoItemClick = (todoId) => {
        setShowSidebar(true);
        setActiveTodoItemId(todoId);
    };

    const handleTodoItemChange = (newTodo) => {
        const newTodoList = todoList.map((todo) => {
            if (todo.id === newTodo.id) {
                return newTodo;
            }
            return todo;
        });
        setTodoList(newTodoList);
    };

    const inputRef = useRef(); //Thao tac Dom element

    const filteredTodos = todoList
        .filter((todo) => {
            switch (selectedFilterId) {
                case "all":
                    return true;
                case "important":
                    return todo.isImportant;
                case "completed":
                    return todo.isCompleted;
                case "deleted":
                    return todo.isDeleted;
                default:
                    return true;
            }
        })
        .map((todo) => {
            return (
                <TodoItem
                    id={todo.id}
                    name={todo.name}
                    key={todo.id}
                    isImportant={todo.isImportant}
                    isCompleted={todo.isCompleted}
                    handleCompleteCheckboxChange={handleCompleteCheckboxChange}
                    handleTodoItemClick={handleTodoItemClick}
                />
            );
        });

    return (
        <div className="container">
            <FilterPanel
                selectedFilterId={selectedFilterId}
                setSelectedFilterId={setSelectedFilterId}
                todoList={todoList}
            />
            <div className="main-content">
                <input
                    ref={inputRef}
                    type="text"
                    name="add-new-task"
                    placeholder="Add new task"
                    className="task-input"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const value = e.target.value;
                            setTodoList([
                                ...todoList,
                                {
                                    id: crypto.randomUUID(),
                                    name: value,
                                    isCompleted: false,
                                    isImportant: false,
                                    isDeleted: false,
                                },
                            ]);
                            inputRef.current.value = "";
                        }
                    }}
                />
                <div>{filteredTodos}</div>
                {showSidebar && (
                    <Sidebar
                        todoItem={activeTodoItem}
                        handleTodoItemChange={handleTodoItemChange}
                        key={activeTodoItemId}
                        setShowSidebar={setShowSidebar}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
