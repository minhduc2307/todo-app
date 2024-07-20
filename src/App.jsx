import { useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";

function App() {
    const [todoList, setTodoList] = useState([
        {
            id: 1,
            name: "Đi học thêm",
            isImportant: true,
            isCompleted: false,
        },
        {
            id: 2,
            name: "Đi tập gym",
            isImportant: false,
            isCompleted: true,
        },
        {
            id: 3,
            name: "Đọc sách",
            isImportant: true,
            isCompleted: true,
        },
    ]);

    const [activeTodoItemId, setActiveTodoItemId] = useState();

    const [showSidebar, setShowSidebar] = useState(false);

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

    const todos = todoList.map((todo) => {
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
                            { id: crypto.randomUUID(), name: value, isCompleted: false, isImportant: false },
                        ]);
                        inputRef.current.value = "";
                    }
                }}
            />
            <div>{todos}</div>
            {showSidebar && (
                <Sidebar
                    todoItem={activeTodoItem}
                    handleTodoItemChange={handleTodoItemChange}
                    key={activeTodoItemId}
                    setShowSidebar={setShowSidebar}
                />
            )}
        </div>
    );
}

export default App;
