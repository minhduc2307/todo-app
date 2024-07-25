import { useAppContext } from "../context/AppProvider";
import "../css/Modal.css";
const Modal = () => {
    const { todoList, setShowModal, deletedTodoId, handleDeleteItem } = useAppContext();
    const deletedTodo = todoList.find((todo) => {
        return todo.id === deletedTodoId;
    });
    return (
        <div className="modal">
            <div className="modal__content">
                <p className="modal__text">{`Do you want to delete "${deletedTodo.name}" from your ToDo List?`}</p>
                <div className="modal__bottom">
                    <button
                        className="modal__btn modal__cancel-btn"
                        onClick={() => {
                            setShowModal(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="modal__btn modal__confirm-btn"
                        onClick={() => {
                            handleDeleteItem(deletedTodo);
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className="modal__overlay"></div>
        </div>
    );
};
export default Modal;
