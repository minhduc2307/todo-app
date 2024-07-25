import PropTypes from "prop-types";
import { FILTER_ITEMS } from "../constants.js";
import { useAppContext } from "../context/AppProvider.jsx";

const FilterList = ({ countByFilterType }) => {
    const { selectedFilterId, setSelectedFilterId } = useAppContext();
    return (
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
                            <p className="filter-item__label">{filterItem.label}</p>
                        </div>
                        <p className="filter-item__num">{countByFilterType[filterItem.id]}</p>
                    </div>
                );
            })}
        </div>
    );
};
export default FilterList;

FilterList.propTypes = {
    FILTER_ITEMS: PropTypes.array,
    selectedFilterId: PropTypes.string,
    setSelectedFilterId: PropTypes.func,
    countByFilterType: PropTypes.object,
};
