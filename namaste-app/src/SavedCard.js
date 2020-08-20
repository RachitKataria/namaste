import React from "react";
import Tag from "./Tag";
import heartFilled from "./img/heart-filled.png";
import { observer, inject } from "mobx-react";
import { toggleSave } from "./Utils";

import "./SavedCard.css";

// videoData.thumbNail = URL of image
// videoData.name
// videoData.channelName
// categories = array of string categories to display as pills
function SavedCard(props) {
  const {
    savedVideos,
    videosToMetadata,
    tagsToVideos,
    currentlyDisplayedVideoInfo,
    setSavedVideos,
    setVideosToMetadata,
    setTagsToVideos,
    setCurrentlyDisplayedVideoInfo,
  } = props.store;
  const videoId = props.videoId;
  const videoData = props.videoData;
  const onClick = props.onClick;

  const savedTagsToDisplayTags = new Map();
  savedTagsToDisplayTags["neck"] = "Neck";
  savedTagsToDisplayTags["upperback"] = "Upper Back";
  savedTagsToDisplayTags["lowerback"] = "Lower Back";
  savedTagsToDisplayTags["abs"] = "Abs";

  const videoTitle = videoData.name;
  const videoChannel = videoData.channelName;
  const videoThumbnail = videoData.thumbNail;
  const tags = videoData.tags;

  function setVideoUnsaved(e) {
    // When clicking the element, stop click propogation to parent elements
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    const {
      savedVideosUpdated,
      videosToMetadataUpdated,
      tagsToVideosUpdated,
    } = toggleSave(
      false,
      savedVideos,
      videosToMetadata,
      tagsToVideos,
      videoId,
      videoChannel,
      videoThumbnail,
      videoTitle,
      videoData.tags[0]
    );

    setSavedVideos(savedVideosUpdated);
    localStorage.setItem(
      "savedVideos",
      JSON.stringify(Array.from(savedVideosUpdated))
    );

    setVideosToMetadata(videosToMetadataUpdated);
    localStorage.setItem(
      "videosToMetadata",
      JSON.stringify(videosToMetadataUpdated)
    );

    setTagsToVideos(tagsToVideosUpdated);
    localStorage.setItem("tagsToVideos", JSON.stringify(tagsToVideosUpdated));

    // If the current video ID that we're unsaving is the same as what's in the store, unset it
    // to trigger a rerender to remove the displayed video
    if (videoId === currentlyDisplayedVideoInfo.id) {
      setCurrentlyDisplayedVideoInfo({});
    }
  }

  function convertSavedTagsToDisplayTags(tags) {
    const displayTags = [];
    tags.forEach((tag) => {
      displayTags.push(savedTagsToDisplayTags[tag]);
    });

    return displayTags;
  }

  const styleClassBasedOnSelect =
    videoId === currentlyDisplayedVideoInfo.id
      ? "search-card-selected"
      : "search-card-unselected";

  return (
    <div onClick={onClick} class={styleClassBasedOnSelect}>
      <div class="search-thumbnail">
        <img src={videoThumbnail} alt="new" />
      </div>
      <div class="search-card-details">
        <span class="videoName">
          <strong>{videoTitle}</strong>
        </span>
        <br />
        <span class="channelName">{videoChannel}</span>
        <br />
        {convertSavedTagsToDisplayTags(tags).map((tag) => (
          <Tag active isClickable={false} text={tag} />
        ))}
      </div>
      <div class="search-heart">
        <img
          onClick={setVideoUnsaved}
          src={heartFilled}
          class="heart"
          alt="new"
        />
      </div>
    </div>
  );
}
export default inject("store")(observer(SavedCard));
