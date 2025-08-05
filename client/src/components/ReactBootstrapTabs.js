import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import '../custom.css'; // For custom styles

const ReactBootstrapTabs = () => {
  return (
    <div className="p-4">
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tabs"
        className="mb-3 custom-tabs"
      >
        <Tab eventKey="home" title="Home">
          <p>This is the Homde tab content.</p>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <p>This is the Proffile tab content.</p>
        </Tab>
        <Tab eventKey="contact" title="Contact">
          <p>This is the Contact tab content.</p>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ReactBootstrapTabs;
