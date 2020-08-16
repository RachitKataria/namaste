import React from "react";
import Tag from "./Tag";
import heartFilled from "./img/heart-filled.png";
import heartEmpty from "./img/heart-empty.png";
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
    setSavedVideos,
    setVideosToMetadata,
    setTagsToVideos,
  } = props.store;
  const videoId = props.videoId;
  const videoData = props.videoData;
  const liked = props.liked;
  const onClick = props.onClick;

  const savedTagsToDisplayTags = new Map();
  savedTagsToDisplayTags["neck"] = "Neck";
  savedTagsToDisplayTags["upperback"] = "Upper Back";
  savedTagsToDisplayTags["lowerback"] = "Lower Back";
  savedTagsToDisplayTags["abs"] = "Abs";

  // const [favorited, setFavorited] = React.useState(liked);

  const videoTitle = videoData.name;
  const videoChannel = videoData.channelName;
  const videoThumbnail = videoData.thumbNail;
  const tags = videoData.tags;

  function toggleImage() {
    // const updatedFavorited = !favorited;
    // setFavorited(updatedFavorited);

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
  }

  function convertSavedTagsToDisplayTags(tags) {
    const displayTags = [];
    tags.forEach((tag) => {
      displayTags.push(savedTagsToDisplayTags[tag]);
    });

    return displayTags;
  }

  return (
    <div onClick={onClick} class="search-card">
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
        <img onClick={toggleImage} src={heartFilled} class="heart" alt="new" />
      </div>
    </div>
  );
}
export default inject("store")(observer(SavedCard));
