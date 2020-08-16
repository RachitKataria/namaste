import React from "react";
import { observer } from "mobx-react";
import Tabs from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";

import Tab from "react-bootstrap/Tab";
import Explore from "./Explore";
import SavedPage from "./SavedPage";

function HomePage({ keywordStore }) {
  const [initialized, setInitialized] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("explore");

  React.useEffect(() => {
    if (!initialized) {
      keywordStore.setKeyword(localStorage.getItem("keyword") || "");
      keywordStore.setVideoDuration(
        localStorage.getItem("videoDuration") || ""
      );
      keywordStore.setBodyRegion(localStorage.getItem("bodyRegion") || "");
      setInitialized(true);
    }

    // ------- TEMP HACKS, set the tagToVideoMap, idToVideoMetaMap, savedVideos maps in localstorage when rendering ------- //
    var tagToVideoIdMap = new Map();
    tagToVideoIdMap["neck"] = ["1"];
    tagToVideoIdMap["upperback"] = ["2"];
    tagToVideoIdMap["lowerback"] = ["3"];
    tagToVideoIdMap["abs"] = ["4"];

    localStorage.setItem("tagToVideoIdMap", JSON.stringify(tagToVideoIdMap));

    var idToVideoMetaMap = new Map();
    idToVideoMetaMap["1"] = {
      channelName: "Number One Channel",
      thumbNail: "Number One Channel",
      tags: ["neck"],
      name: "Awesome Video One",
    };
    idToVideoMetaMap["2"] = {
      channelName: "Number Two Channel",
      thumbNail: "https://i.ytimg.com/vi/t1aYwLUeSIU/default.jpg",
      tags: ["upperback"],
      name: "Awesome Video Two",
    };
    idToVideoMetaMap["3"] = {
      channelName: "Number Three Channel",
      thumbNail: "https://i.ytimg.com/vi/t1aYwLUeSIU/default.jpg",
      tags: ["lowerback"],
      name: "Awesome Video Three",
    };
    idToVideoMetaMap["4"] = {
      channelName: "Number Four Channel",
      thumbNail: "https://i.ytimg.com/vi/t1aYwLUeSIU/default.jpg",
      tags: ["abs"],
      name: "Awesome Video Four",
    };

    localStorage.setItem("idToVideoMetaMap", JSON.stringify(idToVideoMetaMap));

    var savedVideosSet = new Set();
    savedVideosSet.add("1");
    savedVideosSet.add("2");
    savedVideosSet.add("3");
    savedVideosSet.add("4");

    const savedVideosArray = Array.from(savedVideosSet);
    console.log("saved videos Array: ", savedVideosArray);
    localStorage.setItem("savedVideos", JSON.stringify(savedVideosArray));

    const savedTagsToDisplayTags = new Map();
    savedTagsToDisplayTags["neck"] = "Neck";
    savedTagsToDisplayTags["upperback"] = "Upper Back";
    savedTagsToDisplayTags["lowerback"] = "Lower Back";
    savedTagsToDisplayTags["abs"] = "Abs";

    localStorage.setItem(
      "savedTagsToDisplayTags",
      JSON.stringify(savedTagsToDisplayTags)
    );
  });

  return (
    <div className="page">
      <h1>Namaste</h1>
      <div>
        <Tab.Container id="tabs" activeKey={activeTab}>
          <Row className="row justify-content-center">
            <div className="navItem">
              <Nav.Item>
                <Nav.Link
                  eventKey="explore"
                  onClick={() => setActiveTab("explore")}
                >
                  EXPLORE
                </Nav.Link>
              </Nav.Item>
              {activeTab == "explore" ? (
                <div className="bottomBar"></div>
              ) : null}
            </div>
            <div className="navItem">
              <Nav.Item>
                <Nav.Link
                  eventKey="saved"
                  onClick={() => setActiveTab("saved")}
                >
                  SAVED
                </Nav.Link>
              </Nav.Item>
              {activeTab == "saved" ? <div className="bottomBar"></div> : null}{" "}
            </div>
          </Row>
          <Row>
            <Tab.Content>
              <Tab.Pane eventKey="explore">
                <Explore />
              </Tab.Pane>
              <Tab.Pane eventKey="saved">
                <SavedPage
                  supportedFilters={["Neck", "Upper Back", "Lower Back", "Abs"]}
                />
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
        <Tabs id="tabs" defaultActiveKey="explore"></Tabs>
      </div>
    </div>
  );
}
export default observer(HomePage);
