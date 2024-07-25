import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState();
    const [todoList, setTodoList] = useState([
        {
            id: "1",
            name: "Học ReactJS",
            isImportant: true,
            isCompleted: false,
            isDeleted: false,
            category: "idea",
        },
        {
            id: "2",
            name: "Tập thể dục",
            isImportant: true,
            isCompleted: true,
            isDeleted: false,
            category: "personal",
        },
        {
            id: "3",
            name: "Nghỉ dưỡng FLC Sầm Sơn",
            isImportant: false,
            isCompleted: false,
            isDeleted: false,
            category: "travel",
        },
        {
            id: "4",
            name: "Code TODO APP",
            isImportant: true,
            isCompleted: true,
            isDeleted: false,
            category: "company",
        },
    ]);

    const [selectedFilterId, setSelectedFilterId] = useState("all");

    const [searchText, setSearchText] = useState("");

    const [activeTodoItemId, setActiveTodoItemId] = useState();

    const [showSidebar, setShowSidebar] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [deletedTodoId, setDeletedTodoId] = useState();

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

    const handleCompleteCheckboxChange = (todoId) => {
        const newTodoList = todoList.map((todo) => {
            if (todo.id === todoId) {
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        });
        setTodoList(newTodoList);
    };

    const handleDeleteItem = (deletedTodoItem) => {
        const newTodoList = todoList.map((todo) => {
            if (todo.id === deletedTodoItem.id) {
                return { ...todo, isDeleted: !todo.isDeleted };
            }
            return todo;
        });
        setTodoList(newTodoList);
        setShowModal(false);
    };

    return (
        <AppContext.Provider
            value={{
                selectedCategoryId,
                setSelectedCategoryId,
                todoList,
                setTodoList,
                selectedFilterId,
                setSelectedFilterId,
                searchText,
                setSearchText,
                activeTodoItemId,
                setActiveTodoItemId,
                showSidebar,
                setShowSidebar,
                handleTodoItemChange,
                handleTodoItemClick,
                handleCompleteCheckboxChange,
                showModal,
                setShowModal,
                deletedTodoId,
                setDeletedTodoId,
                handleDeleteItem,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.element,
};

export default AppProvider;

export const useAppContext = () => {
    return useContext(AppContext);
};
