import React from "react";
import { observer } from "mobx-react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Explore from "./Explore";
import SavedPage from "./SavedPage";

function HomePage({ keywordStore }) {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    if (!initialized) {
      keywordStore.setKeyword(localStorage.getItem("keyword") || "");
      keywordStore.setVideoDuration(
        localStorage.getItem("videoDuration") || ""
      );
      keywordStore.setBodyRegion(localStorage.getItem("bodyRegion") || "");
      setInitialized(true);
    }
  });

  return (
    <div className="page">
      <h1>Namaste</h1>
      <div>
        <Tabs defaultActiveKey="explore">
          <Tab eventKey="explore" title="EXPLORE">
            <Explore />
          </Tab>
          <Tab eventKey="saved" title="SAVED">
            <SavedPage
              supportedFilters={["Neck", "Upper Back", "Lower Back", "Abs"]}
            />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
export default observer(HomePage);
