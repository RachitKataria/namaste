import React, { useEffect } from "react";
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
  const defaultTitle = "SELECT";
  const [videoThumbnail, setVideoThumbnail] = React.useState("");

  const [bodyRegionTitle, setBodyRegionTitle] = React.useState(defaultTitle);
  const [videoDurationTitle, setVideoDurationTitle] = React.useState(
    defaultTitle
  );
  const [videoId, setVideoId] = React.useState("");
  const [videoTitle, setVideoTitle] = React.useState("");
  const [videoChannel, setVideoChannel] = React.useState("");
  const [saved, setSaved] = React.useState(savedVideos.has(videoId));

  const [videoURL, setVideoURL] = React.useState("");

  const isSaved = savedVideos.has(videoId);

  // Disable randomize button
  const shouldDisableRandomize = () => {
    return (
      bodyRegionTitle == defaultTitle ||
      videoDurationTitle == defaultTitle ||
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
    console.log("RANDOMIZE");
    // Query youtube API
    setLoadingVideo(true);

    // Reset video URL
    setVideoURL("");

    const response = await youtube.get("/search", {
      params: {
        part: "snippet",
        maxResults: 10,
        q: bodyRegionTitle + "yoga",
        type: "video",
        videoDuration: videoDurationTitle,
        videoEmbeddable: "true",
        key: "AIzaSyAO1kbN2GO_cSg0QbeD3cPlcLxM_d13LWw",
      },
    });

    setLoadingVideo(false);
    if (response != null) {
      console.log(response);
      const randVideoIndex = Math.floor(
        Math.random() * response.data.items.length
      );

      const videoData = response.data.items[randVideoIndex];

      // Set video id
      setVideoId(videoData.id.videoId);

      // Set thumbnail
      setVideoThumbnail(videoData.snippet.thumbnails.default.url);
      setVideoURL("https://www.youtube.com/embed/" + videoData.id.videoId);
      setVideoTitle(unEntity(videoData.snippet.title));
      setVideoChannel(videoData.snippet.channelTitle);

      const videoIsSaved = savedVideos.has(videoData.id.videoId);
      setSaved(videoIsSaved);
    } else {
      console.log("Response unsuccessful");
    }
  }

  function calculatedHeartImage() {
    return isSaved ? heartFilled : heartEmpty;
  }

  function toggleImage() {
    const updatedSaved = !isSaved;
    setSaved(updatedSaved);

    const {
      savedVideosUpdated,
      videosToMetadataUpdated,
      tagsToVideosUpdated,
    } = toggleSave(
      updatedSaved,
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
      {videoURL != "" ? (
        <div id="youtubeVideo">
          <iframe
            width="560"
            height="315"
            src={videoURL}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div>
            <div id="videoTextMetadata">
              <span id="videoTitle">{videoTitle}</span>
              <br />
              <span id="channelTitle">{videoChannel}</span>
            </div>
            <div id="videoImgMetadata">
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
            <div className="spinner-border m-4" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      ) : null}
      <div>
        <div>
          <div id="body_region">
            <div className="dropdownContainer">
              <p>BODY REGION</p>
              <DropdownButton id="defaultButton" title={bodyRegionTitle}>
                <Dropdown.Item>
                  <div onClick={(e) => setBodyRegionTitle("NECK")}>NECK</div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={(e) => setBodyRegionTitle("UPPER BACK")}>
                    UPPER BACK
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={(e) => setBodyRegionTitle("LOWER BACK")}>
                    LOWER BACK
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={(e) => setBodyRegionTitle("ABS")}>ABS</div>
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div id="video_duration">
            <div className="dropdownContainer">
              <p>VIDEO DURATION</p>
              <DropdownButton id="defaultButton" title={videoDurationTitle}>
                <Dropdown.Item>
                  <div onClick={(e) => setVideoDurationTitle("SHORT")}>
                    SHORT
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={(e) => setVideoDurationTitle("MEDIUM")}>
                    MEDIUM
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div onClick={(e) => setVideoDurationTitle("LONG")}>LONG</div>
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </div>
        <div id="randomizeButton">
          <Button
            id="defaultButton"
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
