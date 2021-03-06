import React from "react";
import Button from "react-bootstrap/Button";

import { observer, inject } from "mobx-react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import youtube from "./youtube";
import heartFilled from "./img/heart-filled.png";
import heartEmpty from "./img/heart-empty.png";
import { toggleSave } from "./Utils";

function Explore(props) {
  const {
    savedVideos,
    videosToMetadata,
    tagsToVideos,
    setSavedVideos,
    setVideosToMetadata,
    setTagsToVideos,
  } = props.store;

  const [loadingVideo, setLoadingVideo] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const defaultTitle = "Select";
  const [videoThumbnail, setVideoThumbnail] = React.useState("");

  const [bodyRegionTitle, setBodyRegionTitle] = React.useState(defaultTitle);
  const [videoDurationTitle, setVideoDurationTitle] = React.useState(
    defaultTitle
  );
  const [videoId, setVideoId] = React.useState("");
  const [videoTitle, setVideoTitle] = React.useState("");
  const [videoChannel, setVideoChannel] = React.useState("");

  const [videoURL, setVideoURL] = React.useState("");

  const isSaved = savedVideos.has(videoId);

  // Disable randomize button
  const shouldDisableRandomize = () => {
    return (
      bodyRegionTitle === defaultTitle ||
      videoDurationTitle === defaultTitle ||
      loadingVideo
    );
  };

  const unEntity = (str) => {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&Quotl;/g, '"')
      .replace(/&gt;/g, ">");
  };

  async function randomizeYoutube() {
    // Query youtube API
    setLoadingVideo(true);

    // Reset video URL
    setVideoURL("");

    try {
      const response = await youtube.get("/search", {
        params: {
          part: "snippet",
          maxResults: 50,
          q: bodyRegionTitle + "yoga",
          type: "video",
          videoDuration: videoDurationTitle,
          videoEmbeddable: "true",
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      });

      setLoadingVideo(false);
      const randVideoIndex = Math.floor(
        Math.random() * response.data.items.length
      );

      const videoData = response.data.items[randVideoIndex];

      // Set video id
      setVideoId(videoData.id.videoId);

      // Set thumbnail
      setVideoThumbnail(videoData.snippet.thumbnails.default.url);
      setVideoURL(
        "https://www.youtube.com/embed/" +
          videoData.id.videoId +
          "?enablejsapi=1"
      );
      setVideoTitle(unEntity(videoData.snippet.title));
      setVideoChannel(videoData.snippet.channelTitle);
      setIsError(false);
    } catch (err) {
      console.log("Error: ", err);

      setLoadingVideo(false);
      setVideoURL("");
      setIsError(true);
      console.log("Response unsuccessful");
    }
  }

  function calculatedHeartImage() {
    return isSaved ? heartFilled : heartEmpty;
  }

  function toggleImage() {
    const {
      savedVideosUpdated,
      videosToMetadataUpdated,
      tagsToVideosUpdated,
    } = toggleSave(
      !isSaved,
      savedVideos,
      videosToMetadata,
      tagsToVideos,
      videoId,
      videoChannel,
      videoThumbnail,
      videoTitle,
      bodyRegionTitle
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

  return (
    <div>
      {videoURL !== "" ? (
        <div class="youtubeVideo">
          <iframe
            width="560"
            height="315"
            src={videoURL}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="explore-video-display"
          ></iframe>
          <div>
            <div id="videoTextMetadata">
              <span id="videoTitle">{videoTitle}</span>
              <br />
              <span id="channelTitle">{videoChannel}</span>
            </div>
            <div className="videoImgMetadata">
              <img
                id="heartImage"
                onClick={toggleImage}
                src={calculatedHeartImage()}
                alt="new"
              />
            </div>
          </div>
        </div>
      ) : loadingVideo ? (
        <div id="videoSpinner">
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border m-4"
              role="status"
              style={{ color: "#e15503" }}
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : isError ? (
        <div>
          <p style={{ textAlign: "center" }}>
            Sorry, something went wrong. Please try again later!{" "}
            <span role="img" aria-label="writing-emoji">
              &#8987;
            </span>
          </p>
        </div>
      ) : (
        <div />
      )}
      <div>
        <div>
          <div id="body_region">
            <div className="dropdownContainer">
              <p>BODY REGION</p>
              <DropdownButton id="defaultButton" title={bodyRegionTitle}>
                <Dropdown.Item>
                  <div onClick={(e) => setBodyRegionTitle("Neck")}>Neck</div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={(e) => setBodyRegionTitle("Upper Back")}>
                    Upper Back
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={(e) => setBodyRegionTitle("Lower Back")}>
                    Lower Back
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={(e) => setBodyRegionTitle("Abs")}>Abs</div>
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div id="video_duration">
            <div className="dropdownContainer">
              <p>VIDEO DURATION</p>
              <DropdownButton id="defaultButton" title={videoDurationTitle}>
                <Dropdown.Item>
                  <div onClick={(e) => setVideoDurationTitle("Short")}>
                    Short
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={(e) => setVideoDurationTitle("Medium")}>
                    Medium
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={(e) => setVideoDurationTitle("Long")}>Long</div>
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </div>
        <div id="randomizeButton">
          <Button
            id="randomizeButtonId"
            variant="primary"
            onClick={randomizeYoutube}
            disabled={shouldDisableRandomize()}
          >
            RANDOMIZE
          </Button>
        </div>
      </div>
    </div>
  );
}
export default inject("store")(observer(Explore));
