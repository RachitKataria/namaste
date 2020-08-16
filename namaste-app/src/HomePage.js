import React from "react";
import { observer } from "mobx-react";
import Tabs from "react-bootstrap/Tabs";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";

import Tab from "react-bootstrap/Tab";
import Explore from "./Explore";
import SavedPage from "./SavedPage";
import KeywordStore from "./store";
import { Provider } from "mobx-react";

function HomePage() {
  const [activeTab, setActiveTab] = React.useState("explore");

  return (
    <div className="page">
      <div style={{ textAlign: "center" }}>
        <h1>Namaste</h1>
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
                {activeTab == "saved" ? (
                  <div className="bottomBar"></div>
                ) : null}{" "}
              </div>
            </Row>
          </div>
          <Row>
            <Tab.Content>
              <Tab.Pane eventKey="explore">
                <Provider store={KeywordStore}>
                  <Explore />
                </Provider>
              </Tab.Pane>
              <Tab.Pane eventKey="saved">
                <Provider store={KeywordStore}>
                  <SavedPage
                    supportedFilters={[
                      "Neck",
                      "Upper Back",
                      "Lower Back",
                      "Abs",
                    ]}
                  />
                </Provider>
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
