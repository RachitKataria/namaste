import React from "react";
import Tag from "./Tag";
import heartFilled from "./img/heart-filled.png";
import heartEmpty from "./img/heart-empty.png";

import "./SavedCard.css";

// video.thumbNail = URL of image
// categories = array of string categories to display as pills
function SavedCard({ video, categories, liked }) {
  const [favorited, setFavorited] = React.useState(liked);

  const videoName =
    "Yoga For Complete Beginners - 20 Minute Home Yoga Workout!";
  const channelName = "Yoga With Adriene";
  const videoDuration = "05:45";

  function toggleImage() {
    console.log("toggled ", favorited);
    setFavorited(!favorited);
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
        <span class="videoDuration">{videoDuration}</span>
        <br />
        <Tag active isClickable={false} text="Shoulders" />
        <Tag active isClickable={false} text="Neck" />
      </div>
      <div class="search-heart">
        <img onClick={toggleImage} src={heartImage} class="heart" alt="new" />
      </div>
    </div>
  );
}

export default SavedCard;
