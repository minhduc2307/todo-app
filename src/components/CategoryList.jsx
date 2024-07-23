import { CATEGORY_ITEMS } from "../constants";
import "./CategoryList.css";

const CategoryList = () => {
    return (
        <div>
            <p>Categories</p>
            <div>
                {CATEGORY_ITEMS.map((category) => {
                    return (
                        <div key={category.id} className="category-item">
                            <p className="category-name">{category.label}</p>
                            <p>2</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default CategoryList;
