import "./FilterPanel.css";
import PropTypes from "prop-types";

const FILTER_ITEMS = [
    {
        id: "all",
        label: "All",
        iconPath: "./public/inbox.png",
    },
    {
        id: "important",
        label: "Important",
        iconPath: "./public/flag.png",
    },
    {
        id: "completed",
        label: "Completed",
        iconPath: "./public/check.png",
    },
    {
        id: "deleted",
        label: "Deleted",
        iconPath: "./public/delete.png",
    },
];

const FilterPanel = ({ selectedFilterId, setSelectedFilterId, todoList }) => {
    const countByFilterType = todoList.reduce(
        (acc, curr) => {
            let newAcc = { ...acc };
            if (curr.isCompleted) {
                newAcc = { ...newAcc, completed: newAcc.completed + 1 };
            }
            if (curr.isImportant) {
                newAcc = { ...newAcc, important: newAcc.important + 1 };
            }
            if (curr.isDeleted) {
                newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
            }
            return newAcc;
        },
        { all: todoList.length, important: 0, completed: 0, deleted: 0 }
    );

    return (
        <div className="filter-panel">
            <input name="search-text" placeholder="Search" />
            <div className="filter-container">
                {FILTER_ITEMS.map((filterItem) => {
                    return (
                        <div
                            key={filterItem.id}
                            className={`filter-item ${filterItem.id === selectedFilterId ? "selected" : ""}`}
                            onClick={() => setSelectedFilterId(filterItem.id)}
                        >
                            <div className="filter-name">
                                <img src={filterItem.iconPath} alt="" />
                                <p>{filterItem.label}</p>
                            </div>
                            <p>{countByFilterType[filterItem.id]}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

FilterPanel.propTypes = {
    selectedFilterId: PropTypes.string,
    setSelectedFilterId: PropTypes.func,
    todoList: PropTypes.array,
};

export default FilterPanel;
