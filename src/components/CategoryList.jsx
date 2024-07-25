import { useMemo } from "react";
import { CATEGORY_ITEMS } from "../constants";
import "../css/CategoryList.css";
import { useAppContext } from "../context/AppProvider";
import PropTypes from "prop-types";

const CategoryList = () => {
    const { selectedCategoryId, setSelectedCategoryId, todoList } = useAppContext();

    const countByCategory = useMemo(() => {
        return todoList.reduce((acc, curr) => ({ ...acc, [curr.category]: acc[curr.category] + 1 }), {
            personal: 0,
            company: 0,
            travel: 0,
            idea: 0,
        });
    }, [todoList]);

    return (
        <div>
            <h2 className="category__heading">Categories</h2>
            <div>
                {CATEGORY_ITEMS.map((category) => {
                    return (
                        <div
                            key={category.id}
                            className={`category-item ${
                                category.id === selectedCategoryId ? "category-item--active" : ""
                            }`}
                            onClick={() => {
                                setSelectedCategoryId(category.id);
                            }}
                        >
                            <div className="category-left">
                                <img src="/folder.svg" alt="" className="category-icon" />
                                <p className="category-name">{category.label}</p>
                            </div>
                            <span className="category-num">{countByCategory[category.id]}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

CategoryList.propTypes = {
    todoList: PropTypes.array,
};

export default CategoryList;
