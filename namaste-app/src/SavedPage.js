import React from "react";
import SavedCard from "./SavedCard";
import FilterBar from "./FilterBar";
import { observer, inject } from "mobx-react";

// supportedFilters is an array
function SavedPage(props) {
  const supportedFilters = props.supportedFilters;
  const {
    savedVideos,
    videosToMetadata,
    tagsToVideos,
    currentlyDisplayedVideoInfo,
    setCurrentlyDisplayedVideoInfo,
  } = props.store;
  // initialize filters to none
  const [selectedFilters, setSelectedFilters] = React.useState([]);

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

  function displayVideo(videoId, videoData) {
    console.log("clicked saved video");

    // Set the currently displayed video info in the store
    // If clicking on an already selected tile, remove the video
    if (videoId === currentlyDisplayedVideoInfo.id) {
      setCurrentlyDisplayedVideoInfo({});
    } else {
      setCurrentlyDisplayedVideoInfo({
        id: videoId,
        title: videoData.name,
        channelName: videoData.channelName,
        url: "https://www.youtube.com/embed/" + videoId,
      });
    }

    // Scroll to top of screen
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  const filtersToShow = getVideosForSelectedFilters(selectedFilters);
  const videoURL = currentlyDisplayedVideoInfo.url;
  const videoTitle = currentlyDisplayedVideoInfo.title;
  const videoChannel = currentlyDisplayedVideoInfo.channelName;

  console.log("filters to shohw: ", filtersToShow);
  return (
    <div id="savedPage">
      {videoURL && (
        <div id="youtubeVideo">
          <iframe
            width="560"
            height="315"
            src={videoURL}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div id="videoTextMetadata">
            <span id="videoTitle">{videoTitle}</span>
            <br />
            <span id="channelTitle">{videoChannel}</span>
          </div>
        </div>
      )}
      <FilterBar onFilterClick={onFilterClick} filters={supportedFilters} />
      {!Object.keys(filtersToShow).length && (
        <div id="noSavedVideosText">
          <p style={{ textAlign: "center" }}>
            No saved videos yet! Head to the Explore tab to add one. &#9997;
          </p>
        </div>
      )}
      {Object.keys(filtersToShow).map((key) => (
        <SavedCard
          onClick={() => displayVideo(key, filtersToShow[key])}
          videoId={key}
          videoData={filtersToShow[key]}
        />
      ))}
    </div>
  );
}

export default inject("store")(observer(SavedPage));
