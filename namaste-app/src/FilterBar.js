import React from "react";
import Tag from "./Tag";

import "./FilterBar.css";

function FilterBar({ filters, onFilterClick }) {
  return (
    <div>
      <span class="body-region-text">Body Region: </span>
      {filters.map((filter) => (
        <Tag isClickable clickHandler={onFilterClick} text={filter} />
      ))}
    </div>
  );
}

export default FilterBar;
