import { useMemo } from "react";
import PropTypes from "prop-types";
import "../css/FilterPanel.css";
import CategoryList from "./CategoryList";
import FilterList from "./FilterList";
import { useAppContext } from "../context/AppProvider";

const FilterPanel = () => {
    const { todoList, searchText, setSearchText } = useAppContext();

    const countByFilterType = useMemo(() => {
        return todoList.reduce(
            (acc, curr) => {
                let newAcc = { ...acc };
                if (curr.isCompleted) {
                    newAcc = { ...newAcc, completed: newAcc.completed + 1 };
                }
                if (curr.isImportant) {
                    newAcc = { ...newAcc, important: newAcc.important + 1 };
                }
                if (curr.isDeleted) {
                    newAcc = { ...newAcc, all: newAcc.all - 1, deleted: newAcc.deleted + 1 };
                }
                return newAcc;
            },
            { all: todoList.length, important: 0, completed: 0, deleted: 0 }
        );
    }, [todoList]);

    return (
        <div className="filter-panel">
            <div className="filter-panel__search">
                <input
                    name="search-text"
                    placeholder="Search"
                    className="filter-panel__search-input"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                />
                <img
                    src="https://minhduc2307.github.io/todo-app/search.svg"
                    alt=""
                    className="filter-panel__search-icon"
                />
            </div>

            <FilterList countByFilterType={countByFilterType} />

            <CategoryList />
        </div>
    );
};

FilterPanel.propTypes = {
    selectedFilterId: PropTypes.string,
    setSelectedFilterId: PropTypes.func,
    todoList: PropTypes.array,
    searchText: PropTypes.string,
    setSearchText: PropTypes.func,
};

export default FilterPanel;
