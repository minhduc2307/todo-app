import { useMemo } from "react";
import "./FilterPanel.css";
import PropTypes from "prop-types";
import CategoryList from "./CategoryList";
import FilterList from "./FilterList";

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

const FilterPanel = ({ selectedFilterId, setSelectedFilterId, todoList, searchText, setSearchText }) => {
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
                    newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
                }
                return newAcc;
            },
            { all: todoList.length, important: 0, completed: 0, deleted: 0 }
        );
    }, [todoList]);

    return (
        <div className="filter-panel">
            <input
                name="search-text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
            />

            <FilterList
                FILTER_ITEMS={FILTER_ITEMS}
                selectedFilterId={selectedFilterId}
                setSelectedFilterId={setSelectedFilterId}
                countByFilterType={countByFilterType}
            />

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
