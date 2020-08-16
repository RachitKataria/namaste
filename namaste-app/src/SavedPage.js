import React, { useEffect } from "react";
import SavedCard from "./SavedCard";
import FilterBar from "./FilterBar";

// supportedFilters is an array
function SavedPage({ supportedFilters }) {
  // initialize filters to none
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const [filteredVideoResults, setFilteredVideoResults] = React.useState([]);

  React.useEffect(() => {
    getVideosForSelectedFilters(selectedFilters);
  }, [selectedFilters]);

  function onFilterClick(filter) {
    const newFilters = selectedFilters;

    if (selectedFilters.includes(filter)) {
      const index = selectedFilters.indexOf(filter);
      newFilters.splice(index, 1);
    } else {
      newFilters.push(filter);
    }

    console.log("filters ", newFilters);
    setSelectedFilters([...newFilters]);
  }

  // Get a video metadata array for the inputted filters
  function getVideosForSelectedFilters(selectedFilters) {
    // If we haven't selected any filters, show all videos
    if (selectedFilters.length === 0) {
      selectedFilters = supportedFilters;
    }

    const savedVideos = new Set(
      JSON.parse(localStorage.getItem("savedVideos"))
    );

    // Map of all tags to videos from localstorage
    const tagToVideoIdMap = JSON.parse(localStorage.getItem("tagToVideoIdMap"));

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

    const idToVideoMetaMap = JSON.parse(
      localStorage.getItem("idToVideoMetaMap")
    );

    // Build the video metadata map that we pass into the SavedCard to render video info
    const resultsToShow = [];
    const videoResultIdArray = Array.from(videoResultIdSet);
    videoResultIdArray.forEach((videoId) => {
      const videoMetaData = idToVideoMetaMap[videoId];
      resultsToShow.push(videoMetaData);
    });

    // Set the new state to the filtered video results
    setFilteredVideoResults(resultsToShow);
  }

  // Video obj:
  // - video.thumbNail = URL of image
  // - video.name
  // - video.channelName
  return (
    <div className="page">
      <FilterBar onFilterClick={onFilterClick} filters={supportedFilters} />
      {filteredVideoResults.map((result) => (
        <SavedCard video={result} liked />
      ))}
    </div>
  );
}

export default SavedPage;
