import React from "react";
import Tag from "./Tag";

import "./FilterBar.css";

function FilterBar({ filters, onFilterClick }) {
  return (
    <div id="filter-bar">
      {filters.map((filter) => (
        <Tag isClickable clickHandler={onFilterClick} text={filter} />
      ))}
    </div>
  );
}

export default FilterBar;
