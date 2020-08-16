import React, { useEffect } from "react";
import SavedCard from "./SavedCard";
import FilterBar from "./FilterBar";
import { observer, inject } from "mobx-react";

// supportedFilters is an array
function SavedPage(props) {
  const supportedFilters = props.supportedFilters;
  const { savedVideos, videosToMetadata, tagsToVideos } = props.store;
  // initialize filters to none
  const [selectedFilters, setSelectedFilters] = React.useState([]);

  React.useEffect(() => {
    getVideosForSelectedFilters(selectedFilters);
  }, [selectedFilters, props]);

  function onFilterClick(filter) {
    const newFilters = selectedFilters;

    if (selectedFilters.includes(filter)) {
      const index = selectedFilters.indexOf(filter);
      newFilters.splice(index, 1);
    } else {
      newFilters.push(filter);
    }
    setSelectedFilters([...newFilters]);
  }

  // Get a video metadata array for the inputted filters
  function getVideosForSelectedFilters(selectedFilters) {
    // If we haven't selected any filters, show all videos
    if (selectedFilters.length === 0) {
      selectedFilters = supportedFilters;
    }

    // Map of all tags to videos from localstorage
    const tagToVideoIdMap = tagsToVideos;
    const videoResultIdSet = new Set();
    const cleanedSelectedFilters = [];

    // For each tag, remove the spaces and make it all lowercase to save into localstorage
    selectedFilters.forEach((filter) => {
      const removeSpaces = filter.split(" ").join("");
      const lowerCase = removeSpaces.toLowerCase();
      cleanedSelectedFilters.push(lowerCase);
    });

    // Filter the videos by tag to find get the IDs of the ones we should display
    Object.keys(tagToVideoIdMap).forEach(function (key) {
      // If the current tag is one that we should show, add it to the result ID set
      if (cleanedSelectedFilters.includes(key)) {
        const videoIdValues = tagToVideoIdMap[key];

        // videoValues is an array. Add all of them to the video set
        videoIdValues.forEach((videoId) => {
          // If this is one of our saved videos, add it into the set
          if (savedVideos.has(videoId)) {
            videoResultIdSet.add(videoId);
          }
        });
      }
    });

    // Build the video metadata map that we pass into the SavedCard to render video info
    const resultsToShow = {};
    const videoResultIdArray = Array.from(videoResultIdSet);
    videoResultIdArray.forEach((videoId) => {
      const videoMetaData = videosToMetadata[videoId];
      resultsToShow[videoId] = videoMetaData;
    });

    return resultsToShow;
  }

  const filtersToShow = getVideosForSelectedFilters(selectedFilters);
  return (
    <div className="page">
      <FilterBar onFilterClick={onFilterClick} filters={supportedFilters} />
      {Object.keys(filtersToShow).map((key) => (
        <SavedCard videoId={key} videoData={filtersToShow[key]} liked />
      ))}
    </div>
  );
}

export default inject("store")(observer(SavedPage));
