import React from "react";
import Tag from "./Tag";
import heartFilled from "./img/heart-filled.png";
import heartEmpty from "./img/heart-empty.png";

import "./SavedCard.css";

// video.thumbNail = URL of image
// video.name
// video.channelName
// categories = array of string categories to display as pills
function SavedCard({ video, liked }) {
  const [favorited, setFavorited] = React.useState(liked);

  const videoName = video.name;
  const channelName = video.channelName;
  const tags = convertSavedTagsToDisplayTags(video.tags);

  function toggleImage() {
    console.log("toggled ", favorited);
    setFavorited(!favorited);
  }

  function convertSavedTagsToDisplayTags(tags) {
    const displayTags = [];
    const savedToDisplayedTagsMap = JSON.parse(
      localStorage.getItem("savedTagsToDisplayTags")
    );
    tags.forEach((tag) => {
      displayTags.push(savedToDisplayedTagsMap[tag]);
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
          <strong>{videoName}</strong>
        </span>
        <br />
        <span class="channelName">{channelName}</span>
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

export default SavedCard;
