import React from "react";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import youtube from "./youtube";

function Explore() {
  const [loadingVideo, setLoadingVideo] = React.useState(false);
  const defaultTitle = "SELECT";
  const [bodyRegionTitle, setBodyRegionTitle] = React.useState(defaultTitle);
  const [videoDurationTitle, setVideoDurationTitle] = React.useState(
    defaultTitle
  );
  const [videoTitle, setVideoTitle] = React.useState("");
  const [videoChannel, setVideoChannel] = React.useState("");

  const [videoURL, setVideoURL] = React.useState("");
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
        maxResults: 50,
        q: bodyRegionTitle + "yoga",
        type: "video",
        videoDuration: videoDurationTitle,
        videoEmbeddable: "true",
        key: "AIzaSyBpilbN3suBcPmg5wueRpZrvJsvpsUvvNQ",
      },
    });

    setLoadingVideo(false);
    console.log(response);
    if (response != null) {
      console.log(response);
      const randVideoIndex = Math.floor(
        Math.random() * response.data.items.length
      );
      const videoData = response.data.items[randVideoIndex];
      setVideoURL("https://www.youtube.com/embed/" + videoData.id.videoId);
      setVideoTitle(unEntity(videoData.snippet.title));
      setVideoChannel(videoData.snippet.channelTitle);
    } else {
      console.log("Response unsuccessful");
    }
  }

  return (
    <div>
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
            <div id="videoMetaData">
              <p id="videoTitle">{videoTitle}</p>
              <p id="channelTitle">{videoChannel}</p>
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
      </div>
      <div id="body_region">
        <div className="dropdownContainer">
          <h3>BODY REGION</h3>
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
          <h3>VIDEO DURATION</h3>
          <DropdownButton id="defaultButton" title={videoDurationTitle}>
            <Dropdown.Item>
              <div onClick={(e) => setVideoDurationTitle("SHORT")}>SHORT</div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div onClick={(e) => setVideoDurationTitle("MEDIUM")}>MEDIUM</div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div onClick={(e) => setVideoDurationTitle("LONG")}>LONG</div>
            </Dropdown.Item>
          </DropdownButton>
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
      <div id="settingsButton">
        <Button id="defaultButton" variant="primary">
          SETTINGS
        </Button>
      </div>
    </div>
  );
}
export default observer(Explore);
