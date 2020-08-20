import React from "react";
import { observer, inject } from "mobx-react";
import Tabs from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";

import Tab from "react-bootstrap/Tab";
import Explore from "./Explore";
import SavedPage from "./SavedPage";

function HomePage(props) {
  const [activeTab, setActiveTab] = React.useState("explore");

  const { setSavedVideos, setVideosToMetadata, setTagsToVideos } = props.store;
  console.log(props.store);

  React.useEffect(() => {
    // Get all info from localstorage and set the correct keys into mobx
    console.log(
      "local saved videos: ",
      JSON.parse(localStorage.getItem("savedVideos"))
    );
    const localStorageSavedVideos = JSON.parse(
      localStorage.getItem("savedVideos")
    );

    if (localStorageSavedVideos) {
      setSavedVideos(new Set(localStorageSavedVideos));
    }

    console.log(
      "local tags to videos: ",
      JSON.parse(localStorage.getItem("tagsToVideos"))
    );
    const localStorageTagsToVideos = JSON.parse(
      localStorage.getItem("tagsToVideos")
    );
    if (localStorageTagsToVideos) {
      setTagsToVideos(localStorageTagsToVideos);
    }

    console.log(
      "local videos to metadata :",
      JSON.parse(localStorage.getItem("videosToMetadata"))
    );
    const localStorageVideosToMetadata = JSON.parse(
      localStorage.getItem("videosToMetadata")
    );
    if (localStorageVideosToMetadata) {
      setVideosToMetadata(localStorageVideosToMetadata);
    }
  }, []);

  const getLinkStyle = (linkName) => {
    if (linkName == activeTab) {
      return { color: "#484848" };
    } else {
      return { color: "#c3bfb9" };
    }
  };

  return (
    <div className="page">
      <div style={{ textAlign: "center" }}>
        <h1>NAMASTE</h1>
      </div>
      <div>
        <Tab.Container id="tabs" activeKey={activeTab}>
          <div id="tabRow">
            <Row className="row justify-content-center">
              <div className="navItem">
                <Nav.Item>
                  <Nav.Link
                    eventKey="explore"
                    onClick={() => setActiveTab("explore")}
                    style={getLinkStyle("explore")}
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
                    style={getLinkStyle("saved")}
                  >
                    SAVED
                  </Nav.Link>
                </Nav.Item>
                {activeTab == "saved" ? (
                  <div className="bottomBar"></div>
                ) : null}{" "}
              </div>
            </Row>
          </div>
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
export default inject("store")(observer(HomePage));
