import PropTypes from "prop-types";

const FilterList = ({ FILTER_ITEMS, selectedFilterId, setSelectedFilterId, countByFilterType }) => {
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
                            <p>{filterItem.label}</p>
                        </div>
                        <p>{countByFilterType[filterItem.id]}</p>
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
