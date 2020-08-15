import React from "react";
import SavedCard from "./SavedCard";
import FilterBar from "./FilterBar";

// supportedFilters is an array
function SavedPage({ supportedFilters }) {
  // initialize filters to none
  const [selectedFilters, setFilters] = React.useState([]);

  function onFilterClick(filter) {
    const newFilters = selectedFilters;

    if (selectedFilters.includes(filter)) {
      const index = selectedFilters.indexOf(filter);
      newFilters.splice(index, 1);
    } else {
      newFilters.push(filter);
    }

    console.log("filters ", newFilters);
    setFilters(newFilters);
  }

  return (
    <div className="page">
      <FilterBar onFilterClick={onFilterClick} filters={supportedFilters} />
      <SavedCard liked />
    </div>
  );
}

export default SavedPage;
