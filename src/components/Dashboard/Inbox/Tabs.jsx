import { useState } from "react";

function Tabs() {
  const [selectedTab, setSelectedTab] = useState("Primary");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <div className=" gmail-ui">
      <div className="tabs">
        <div
          className={`tab ${selectedTab === "Primary" ? "active" : ""}`}
          onClick={() => handleTabClick("Primary")}
        >
          Primary
        </div>
        <div
          className={`tab ${selectedTab === "Social" ? "active" : ""}`}
          onClick={() => handleTabClick("Social")}
        >
          Social
        </div>
        <div
          className={`tab ${selectedTab === "Promotions" ? "active" : ""}`}
          onClick={() => handleTabClick("Promotions")}
        >
          Promotions
        </div>
      </div>
    </div>
  );
}

export default Tabs;
