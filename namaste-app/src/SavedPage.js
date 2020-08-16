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
  const [filteredVideoResults, setFilteredVideoResults] = React.useState([]);

  React.useEffect(() => {
    console.log("saved vids: ", savedVideos);

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

    console.log("filters ", newFilters);
    setSelectedFilters([...newFilters]);
  }

  // Get a video metadata array for the inputted filters
  function getVideosForSelectedFilters(selectedFilters) {
    console.log(props.store);

    // If we haven't selected any filters, show all videos
    if (selectedFilters.length === 0) {
      selectedFilters = supportedFilters;
    }

    // Map of all tags to videos from localstorage
    const tagToVideoIdMap = tagsToVideos;
    console.log("mobx tag to vid map: ", tagToVideoIdMap);
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
        console.log("vid id values: ", videoIdValues);

        // videoValues is an array. Add all of them to the video set
        videoIdValues.forEach((videoId) => {
          // If this is one of our saved videos, add it into the set
          if (savedVideos.has(videoId)) {
            videoResultIdSet.add(videoId);
          }
        });
      }
    });

    const idToVideoMetaMap = videosToMetadata;
    console.log("mobx id to meta map: ", idToVideoMetaMap);

    // Build the video metadata map that we pass into the SavedCard to render video info
    const resultsToShow = [];
    const videoResultIdArray = Array.from(videoResultIdSet);
    videoResultIdArray.forEach((videoId) => {
      const videoMetaData = idToVideoMetaMap[videoId];
      resultsToShow.push(videoMetaData);
    });

    console.log("results to show: ", resultsToShow);

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

export default inject("store")(observer(SavedPage));
