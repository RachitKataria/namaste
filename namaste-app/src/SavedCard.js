import React from "react";
import Tag from "./Tag";
import heartFilled from "./img/heart-filled.png";
import heartEmpty from "./img/heart-empty.png";
import { observer, inject } from "mobx-react";

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

  console.log(props);

  const savedTagsToDisplayTags = new Map();
  savedTagsToDisplayTags["neck"] = "Neck";
  savedTagsToDisplayTags["upperback"] = "Upper Back";
  savedTagsToDisplayTags["lowerback"] = "Lower Back";
  savedTagsToDisplayTags["abs"] = "Abs";

  const [favorited, setFavorited] = React.useState(liked);

  const videoTitle = videoData.name;
  const videoChannel = videoData.channelName;
  const videoThumbnail = videoData.thumbNail;
  const tags = convertSavedTagsToDisplayTags(videoData.tags);

  function toggleImage() {
    const updatedFavorited = !favorited;
    setFavorited(updatedFavorited);

    // Update saved states
    let savedVideosUpdated = savedVideos;
    let videosToMetadataUpdated = videosToMetadata;
    let tagsToVideosUpdated = tagsToVideos;

    if (updatedFavorited) {
      savedVideosUpdated.add(videoId);
      setSavedVideos(savedVideosUpdated);

      videosToMetadataUpdated[videoId] = {
        channelName: videoChannel,
        tags: tags,
        thumbNail: videoThumbnail,
        name: videoTitle,
      };
      setVideosToMetadata(videosToMetadataUpdated);

      tags.forEach((tag) => {
        tagsToVideosUpdated[tag].push(videoId);
      });
      setTagsToVideos(tagsToVideosUpdated);
    } else {
      savedVideosUpdated.delete(videoId);
      setSavedVideos(savedVideosUpdated);

      videosToMetadataUpdated.delete(videoId);
      setVideosToMetadata(videosToMetadataUpdated);

      tags.forEach((tag) => {
        const videoIndex = tagsToVideosUpdated[tag].indexOf(videoId);
        if (videoIndex > -1) {
          tagsToVideosUpdated[tag].splice(videoIndex, 1);
        }
      });
      setTagsToVideos(tagsToVideosUpdated);
    }
  }

  function convertSavedTagsToDisplayTags(tags) {
    const displayTags = [];
    tags.forEach((tag) => {
      displayTags.push(savedTagsToDisplayTags[tag]);
    });

    return displayTags;
  }

  const heartImage = favorited ? heartFilled : heartEmpty;
  return (
    <div class="search-card">
      <div class="search-thumbnail">
        <img src="https://i.ytimg.com/vi/t1aYwLUeSIU/default.jpg" alt="new" />
      </div>
      <div class="search-card-details">
        <span class="videoName">
          <strong>{videoTitle}</strong>
        </span>
        <br />
        <span class="channelName">{videoChannel}</span>
        <br />
        {tags.map((tag) => (
          <Tag active isClickable={false} text={tag} />
        ))}
      </div>
      <div class="search-heart">
        <img onClick={toggleImage} src={heartImage} class="heart" alt="new" />
      </div>
    </div>
  );
}
export default inject("store")(observer(SavedCard));
